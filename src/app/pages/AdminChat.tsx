import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRound } from 'lucide-react';
import { ConversationPanel, type ConversationMessage } from '../components/chat/ConversationPanel';
import { IncomingHandoverModal } from '../components/chat/IncomingHandoverModal';
import socketService from '../hooks/socket';
import { AdminHandler } from '../hooks/socket/adminHandler';
import { authApi, devicesApi } from '../services/api';
import { registerAdminPush } from '../utils/adminMessaging';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import { logoutAdmin, setAdminFcmToken } from '../redux/slices';

type Lead = {
  sessionId: string;
  status: 'AI' | 'HANDOVER_REQUESTED' | 'LIVE' | 'ADMIN_BUSY';
  visitorName: string;
  visitorEmail: string;
  visitorVerified: boolean;
  assignedAdminId: string;
  assignedAdminEmail: string;
  latestMessage: string;
  messages: ConversationMessage[];
  handoverTimeoutAt: string | null;
};

export const AdminChat = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [incomingLead, setIncomingLead] = useState<Lead | null>(null);
  const ringtoneStopRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (!auth.adminAccessToken) {
      return;
    }

    const handler = new AdminHandler({
      setLeads,
      setActiveChat: ({ sessionId }: { sessionId: string }) => {
        setSelectedSessionId(sessionId);
      },
      appendLiveMessage: (message: ConversationMessage) => {
        setLeads((previous) =>
          previous.map((lead) =>
            lead.sessionId === selectedSessionId
              ? {
                ...lead,
                messages: dedupeMessages([...lead.messages, message]).slice(-100),
                latestMessage: message.content,
              }
              : lead,
          ),
        );
      },
      onIncomingLead: (lead: Lead) => {
        if (document.visibilityState === 'visible') {
          setIncomingLead(lead);
          ringtoneStopRef.current?.();
          ringtoneStopRef.current = playIncomingRingtone();
        }

        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification('New lead waiting', {
            body: lead.visitorName || lead.latestMessage || 'A visitor requested human help.',
          });
        }
      },
    });

    socketService.connectAdmin({
      handler,
      token: auth.adminAccessToken,
      deviceInfo: getDeviceInfo(),
      fcmToken: auth.adminFcmToken,
    });

    return () => {
      ringtoneStopRef.current?.();
      socketService.disconnect();
    };
  }, [auth.adminAccessToken, auth.adminFcmToken]);

  useEffect(() => {
    if (!auth.adminAccessToken) {
      return;
    }

    registerAdminPush().then((payload) => {
      if (!payload) {
        return;
      }

      dispatch(setAdminFcmToken(payload.fcmToken));
      return devicesApi.registerAdminDevice(auth.adminAccessToken, payload);
    })
      .catch((error: unknown) => {
        console.warn('Admin push registration skipped:', error);
      });
  }, [auth.adminAccessToken, dispatch]);

  useEffect(() => {
    if (!selectedSessionId && leads.length) {
      setSelectedSessionId(leads[0].sessionId);
    }
  }, [leads, selectedSessionId]);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.sessionId === selectedSessionId) ?? null,
    [leads, selectedSessionId],
  );

  const submitLiveReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!selectedLead?.sessionId || !content || selectedLead.status !== 'LIVE') {
      return;
    }

    socketService.sendAdminMessage(selectedLead.sessionId, content);
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
      ringtoneStopRef.current?.();
      socketService.disconnect();
      dispatch(logoutAdmin());
    }
  };

  const acceptLead = (sessionId: string) => {
    ringtoneStopRef.current?.();
    setIncomingLead(null);
    setSelectedSessionId(sessionId);
    socketService.acceptHandover(sessionId);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.14),_transparent_28%),linear-gradient(180deg,_#081018_0%,_#03060a_100%)] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 px-4 py-4 md:px-6 md:py-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/8 px-2 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-rose-200/80">Visitors</p>
              <h2 className="mt-2 text-xl text-white">Active + recent threads</h2>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70"
            >
              Logout
            </button>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {leads.map((lead) => {
              const isSelected = lead.sessionId === selectedSessionId;
              return (
                <button
                  key={lead.sessionId}
                  type="button"
                  onClick={() => setSelectedSessionId(lead.sessionId)}
                  className={`rounded-[24px] border px-4 py-4 text-left transition ${isSelected
                    ? 'border-cyan-300/35 bg-cyan-300/12'
                    : lead.status === 'HANDOVER_REQUESTED'
                      ? 'border-rose-300/25 bg-rose-300/10'
                      : 'border-white/10 bg-white/[0.03]'
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/75">
                        <UserRound size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-white">{lead.visitorName || 'Anonymous visitor'}</div>
                        <div className="mt-1 text-xs text-white/48">{lead.visitorEmail || 'No verified email'}</div>
                      </div>
                    </div>
                    <StatusPill status={lead.status} />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-white/58">{lead.latestMessage || 'No messages yet.'}</p>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="min-h-0">
          <ConversationPanel
            title={selectedLead?.visitorName || 'Select a visitor'}
            subtitle={
              selectedLead
                ? selectedLead.visitorEmail || 'Unverified visitor thread'
                : 'Choose a thread from the sidebar to review the conversation and respond when the handover is live.'
            }
            statusBadge={selectedLead ? <StatusPill status={selectedLead.status} /> : undefined}
            messages={selectedLead?.messages ?? []}
            draft={draft}
            onDraftChange={setDraft}
            onSubmit={submitLiveReply}
            inputPlaceholder={
              selectedLead?.status === 'LIVE'
                ? 'Type your reply to the visitor...'
                : 'Accept the handover before replying...'
            }
            submitLabel="Reply"
            disabled={!selectedLead || selectedLead.status !== 'LIVE'}
            footer={
              selectedLead ? (
                <div className="flex flex-wrap items-center gap-3">
                  {selectedLead.status === 'HANDOVER_REQUESTED' ? (
                    <button
                      type="button"
                      onClick={() => acceptLead(selectedLead.sessionId)}
                      className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950"
                    >
                      Accept handover
                    </button>
                  ) : null}

                  {selectedLead.status !== 'LIVE' ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/62">
                      This thread remains visible in the sidebar so you can revisit it later. Only live handovers accept replies.
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-50">
                      Live takeover active. Messages here go directly to the visitor.
                    </div>
                  )}
                </div>
              ) : undefined
            }
            emptyState={
              <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-sm text-white/45">
                Visitor threads will appear in the sidebar and stay available for later follow-up.
              </div>
            }
          />
        </div>
      </div>

      <IncomingHandoverModal
        isOpen={Boolean(incomingLead)}
        visitorName={incomingLead?.visitorName || ''}
        latestMessage={incomingLead?.latestMessage || ''}
        onDismiss={() => {
          ringtoneStopRef.current?.();
          setIncomingLead(null);
        }}
        onAccept={() => {
          if (!incomingLead) {
            return;
          }

          acceptLead(incomingLead.sessionId);
        }}
      />
    </div>
  );
};

const StatusPill = ({ status }: { status: Lead['status'] }) => {
  const classes =
    status === 'HANDOVER_REQUESTED'
      ? 'border-rose-300/20 bg-rose-300/12 text-rose-50'
      : status === 'LIVE'
        ? 'border-emerald-300/20 bg-emerald-300/12 text-emerald-50'
        : status === 'ADMIN_BUSY'
          ? 'border-amber-300/20 bg-amber-300/12 text-amber-50'
          : 'border-white/10 bg-white/[0.04] text-white/60';

  return <span className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.2em] ${classes}`}>{status}</span>;
};

const dedupeMessages = (messages: ConversationMessage[]) => {
  const seen = new Set<string>();
  return messages.filter((message) => {
    if (seen.has(message.id)) {
      return false;
    }

    seen.add(message.id);
    return true;
  });
};

const playIncomingRingtone = () => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) {
    return () => undefined;
  }

  const context = new AudioContextClass();
  let cancelled = false;

  const ring = () => {
    if (cancelled) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);

    window.setTimeout(ring, 1200);
  };

  void context.resume().then(ring).catch(() => undefined);

  return () => {
    cancelled = true;
    void context.close().catch(() => undefined);
  };
};