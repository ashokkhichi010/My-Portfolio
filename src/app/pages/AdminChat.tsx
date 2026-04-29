import { useEffect, useMemo, useState } from 'react';
import { BellRing, Clock3, ShieldCheck, UserRound } from 'lucide-react';
import socketService from '../hooks/socket';
import { AdminHandler } from '../hooks/socket/adminHandler';

export const AdminChat = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const handler = new AdminHandler(setLeads);
    socketService.connectAdmin(handler);

    return () => {
      socketService.disconnect();
    };
  }, []);

  const pendingCount = useMemo(
    () => leads.filter((lead) => lead.status === 'HANDOVER_REQUESTED').length,
    [leads],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.14),_transparent_30%),linear-gradient(180deg,_#081018_0%,_#03060a_100%)] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-rose-200/80">Admin Dashboard</p>
            <h1 className="mt-3 font-system-display text-4xl tracking-tight">Verified Handover Queue</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/65 md:text-base">
              Visitors who authenticate with Google and request human takeover appear here in realtime.
            </p>
          </div>
          <div className="rounded-3xl border border-rose-300/15 bg-rose-300/10 px-5 py-4">
            <div className="flex items-center gap-3 text-sm text-rose-100">
              <BellRing size={18} />
              <span>{pendingCount} pending handover request{pendingCount === 1 ? '' : 's'}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Pending" value={String(pendingCount)} icon={<Clock3 size={18} />} />
          <MetricCard
            label="Verified Visitors"
            value={String(leads.filter((lead) => lead.visitorVerified).length)}
            icon={<ShieldCheck size={18} />}
          />
          <MetricCard label="Visible Leads" value={String(leads.length)} icon={<UserRound size={18} />} />
        </div>

        <div className="mt-8 grid gap-4">
          {leads.length ? (
            leads.map((lead) => (
              <div
                key={lead.sessionId}
                className={`rounded-[28px] border p-5 backdrop-blur-xl ${
                  lead.status === 'HANDOVER_REQUESTED'
                    ? 'border-rose-300/30 bg-rose-300/12 shadow-[0_0_0_1px_rgba(244,63,94,0.08),0_24px_80px_rgba(244,63,94,0.08)]'
                    : 'border-white/10 bg-white/[0.04]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/55">
                        {lead.status}
                      </span>
                      {lead.visitorVerified ? (
                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
                          Verified
                        </span>
                      ) : null}
                    </div>
                    <h2 className="text-xl text-white">{lead.visitorName || 'Anonymous visitor'}</h2>
                    <p className="text-sm text-white/58">{lead.visitorEmail || 'No verified email attached'}</p>
                    <p className="max-w-3xl text-sm text-white/72">{lead.latestMessage || 'No messages yet.'}</p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right text-xs text-white/45">
                      <div>Session: {lead.sessionId}</div>
                      <div>Timeout: {lead.handoverTimeoutAt ? formatDateTime(lead.handoverTimeoutAt) : 'Not running'}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => socketService.acceptHandover(lead.sessionId)}
                      disabled={lead.status !== 'HANDOVER_REQUESTED'}
                      className="rounded-2xl border border-cyan-300/25 bg-cyan-300/15 px-4 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/22 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Accept Handover
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-12 text-center text-white/45">
              No visitor leads yet. Ask the AI for hiring/contact help on <code className="rounded bg-white/10 px-2 py-1 text-xs">/chat</code> to test the queue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
    <div className="flex items-center justify-between text-white/55">
      <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
      {icon}
    </div>
    <div className="mt-4 text-3xl text-white">{value}</div>
  </div>
);

const formatDateTime = (value) => {
  return new Date(value).toLocaleString();
};
