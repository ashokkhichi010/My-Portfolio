import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BellRing, Clock3, LogOut, Send, ShieldCheck, UserRound } from 'lucide-react';
import socketService from '../hooks/socket';
import { AdminHandler } from '../hooks/socket/adminHandler';
import { authApi, devicesApi } from '../services/api';
import { registerAdminPush } from '../utils/adminMessaging';
import { logoutAdmin } from '../redux/slices';

type Lead = {
  sessionId: string;
  status: 'AI' | 'HANDOVER_REQUESTED' | 'LIVE' | 'ADMIN_BUSY';
  visitorName: string;
  visitorEmail: string;
  visitorVerified: boolean;
  latestMessage: string;
  handoverTimeoutAt: string | null;
};

type LiveMessage = {
  id: string;
  role: 'visitor' | 'assistant' | 'admin';
  content: string;
  createdAt: string;
};

type ActiveChatState = {
  sessionId: string;
  status: 'LIVE';
  visitorName: string;
  visitorEmail: string;
  messages: LiveMessage[];
};

export const AdminChat = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeChat, setActiveChat] = useState<ActiveChatState | null>(null);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!auth.adminAccessToken) {
      return;
    }

    const handler = new AdminHandler({
      setLeads,
      setActiveChat,
      appendLiveMessage: (message: LiveMessage) => {
        setActiveChat((previous) => {
          if (!previous) {
            return previous;
          }

          const exists = previous.messages.some((item) => item.id === message.id);
          if (exists) {
            return previous;
          }

          return {
            ...previous,
            messages: [...previous.messages, message].slice(-100),
          };
        });
      },
    });

    socketService.connectAdmin({ handler, token: auth.adminAccessToken });

    return () => {
      socketService.disconnect();
    };
  }, [auth.adminAccessToken]);

  useEffect(() => {
    if (!auth.adminAccessToken) {
      return;
    }

    registerAdminPush()
      .then((payload) => {
        if (!payload) {
          return;
        }

        return devicesApi.registerAdminDevice(auth.adminAccessToken, payload);
      })
      .catch((error: unknown) => {
        console.warn('Admin push registration skipped:', error);
      });
  }, [auth.adminAccessToken]);

  const pendingCount = useMemo(
    () => leads.filter((lead) => lead.status === 'HANDOVER_REQUESTED').length,
    [leads],
  );

  const submitLiveReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = draft.trim();
    if (!activeChat?.sessionId || !content) {
      return;
    }

    socketService.sendAdminMessage(activeChat.sessionId, content);
    setDraft('');
  };

  const handleLogout = async () => {
    try {
      if (auth.adminAccessToken && auth.adminRefreshToken) {
        await authApi.adminLogout(auth.adminAccessToken, auth.adminRefreshToken);
      }
    } catch (error: unknown) {
      console.warn('Admin logout request failed:', error);
    } finally {
      socketService.disconnect();
      dispatch(logoutAdmin());
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.14),_transparent_30%),linear-gradient(180deg,_#081018_0%,_#03060a_100%)] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-rose-200/80">Admin Dashboard</p>
            <h1 className="mt-3 font-system-display text-4xl tracking-tight">Verified Handover Queue</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/65 md:text-base">
              Live leads, browser push registration, and direct human takeover all run from this console.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-3xl border border-rose-300/15 bg-rose-300/10 px-5 py-4">
              <div className="flex items-center gap-3 text-sm text-rose-100">
                <BellRing size={18} />
                <span>{pendingCount} pending handover request{pendingCount === 1 ? '' : 's'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
            >
              <LogOut size={16} />
              Logout
            </button>
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

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
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

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            {activeChat ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/8 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/75">Live takeover</p>
                    <h2 className="mt-2 text-2xl text-white">{activeChat.visitorName || 'Verified visitor'}</h2>
                    <p className="mt-2 text-sm text-white/58">{activeChat.visitorEmail || 'No email on file'}</p>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-emerald-100">
                    {activeChat.status}
                  </div>
                </div>

                <div className="mt-5 flex min-h-[360px] max-h-[520px] flex-col gap-3 overflow-y-auto pr-1">
                  {activeChat.messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>

                <form className="mt-5 flex gap-3" onSubmit={submitLiveReply}>
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type your live reply to the visitor..."
                    className="min-h-[92px] flex-1 rounded-3xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-3xl bg-cyan-300 px-5 py-4 text-sm font-medium text-slate-950 transition disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
                  >
                    <Send size={16} />
                    Reply
                  </button>
                </form>
              </>
            ) : (
              <div className="flex min-h-[520px] items-center justify-center rounded-[26px] border border-dashed border-white/10 bg-black/10 px-8 text-center text-white/45">
                Accept a verified handover request to open the live human thread here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon }: { label: string; value: string; icon: ReactNode }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
    <div className="flex items-center justify-between text-white/55">
      <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
      {icon}
    </div>
    <div className="mt-4 text-3xl text-white">{value}</div>
  </div>
);

const MessageBubble = ({ message }: { message: LiveMessage }) => {
  const isAdmin = message.role === 'admin';
  const accent = isAdmin
    ? 'rounded-br-md bg-cyan-300 text-slate-950'
    : message.role === 'visitor'
      ? 'rounded-bl-md border border-amber-200/10 bg-amber-200/10 text-white'
      : 'rounded-bl-md border border-white/10 bg-white/[0.05] text-white/88';

  return (
    <div className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${accent}`}>{message.content}</div>
    </div>
  );
};

const formatDateTime = (value: string) => new Date(value).toLocaleString();
