import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Radio, RefreshCw, Send, Sparkles } from 'lucide-react';
import { SolarBackground } from '../components/SolarBackground';
import socketService from '../hooks/socket';
import { Handler } from '../hooks/socket/handler';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import {
  addMessage,
  resetConnection,
  setConnectionStatus,
  setHandoverOffer,
  setSessionReady,
  setSocketId,
  setAwaitingAi,
} from '../redux/slices';

const statusToneMap = {
  idle: 'text-white/60',
  connecting: 'text-amber-300',
  connected: 'text-emerald-300',
  disconnected: 'text-rose-300',
};

export const VisitorChat = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state: any) => state.chat);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!chat.isRehydrated) {
      return;
    }

    const handler = new Handler({
      dispatch,
      actions: {
        setConnectionStatus,
        setSessionReady,
        setSocketId,
        resetConnection,
        addMessage,
        setHandoverOffer,
      },
    });

    socketService.connect({
      sessionId: chat.sessionId,
      deviceInfo: getDeviceInfo(),
      handler,
    });

    return () => {
      socketService.disconnect();
    };
  }, [chat.isRehydrated, dispatch]);

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = draft.trim();
    if (!content || chat.connectionStatus !== 'connected') {
      return;
    }

    dispatch(setAwaitingAi(true));
    socketService.sendMessage(content);
    setDraft('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(76,201,240,0.12),_transparent_35%),linear-gradient(180deg,_#07131d_0%,_#05080c_100%)] text-white">
      <SolarBackground />
      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 py-24">
        <div className="w-full rounded-[32px] border border-white/10 bg-black/35 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
          <div className="mb-10 flex items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200">
                <Radio size={14} />
                Step 1 Foundation
              </div>
              <div>
                <h1 className="font-system-display text-4xl tracking-tight text-white md:text-5xl">
                  Visitor Chat Session
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-white/68 md:text-base">
                  Anonymous visitor identity is now restored through the socket handshake. Refresh the page and the
                  backend should recognize the same session.
                </p>
              </div>
            </div>

            <div className="hidden rounded-3xl border border-white/10 bg-white/5 p-4 md:block">
              <MessageSquare className="text-cyan-200" size={28} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatusCard
              label="Connection"
              value={chat.connectionStatus}
              tone={statusToneMap[chat.connectionStatus] ?? statusToneMap.idle}
            />
            <StatusCard label="Session ID" value={chat.sessionId ?? 'Waiting for handshake...'} />
            <StatusCard label="Socket ID" value={chat.socketId ?? 'Waiting for connection...'} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/75">AI Conversation</p>
                  <p className="mt-2 text-sm text-white/60">
                    Ask about projects, stack, experience, or hiring availability.
                  </p>
                </div>
                <Sparkles className="text-cyan-200" size={20} />
              </div>

              <div className="mt-4 flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto pr-1">
                {chat.messages.length ? (
                  chat.messages.map((message) => (
                    <MessageBubble key={message.id} role={message.role} content={message.content} />
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-sm text-white/45">
                    Start the conversation and the AI assistant will respond here.
                  </div>
                )}

                {chat.isAwaitingAi ? (
                  <div className="max-w-[85%] rounded-3xl rounded-bl-md border border-cyan-400/15 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-50">
                    Assistant is thinking...
                  </div>
                ) : null}
              </div>

              <form className="mt-5 flex gap-3" onSubmit={submitMessage}>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Try: I want to hire you for a realtime product build."
                  className="min-h-[92px] flex-1 rounded-3xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                />
                <button
                  type="submit"
                  disabled={chat.connectionStatus !== 'connected' || !draft.trim()}
                  className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-3xl bg-cyan-300 px-5 py-4 text-sm font-medium text-slate-950 transition disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
                >
                  <Send size={16} />
                  Send
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <RefreshCw size={16} />
                  <span>
                    {chat.isRestored
                      ? 'This browser session was restored from persisted storage.'
                      : 'The first successful handshake created a new anonymous visitor session.'}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-white/60">
                  <MetaRow label="Rehydration Gate" value={chat.isRehydrated ? 'Complete' : 'Waiting'} />
                  <MetaRow label="Connected At" value={chat.connectedAt ?? 'Pending'} />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Handover State</p>
                <p className="mt-3 text-sm text-white/68">
                  The admin CTA only appears after the AI detects clear hire/contact intent.
                </p>
                {chat.showHandoverButton ? (
                  <button
                    type="button"
                    className="mt-5 w-full rounded-2xl border border-emerald-300/30 bg-emerald-300/15 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/20"
                  >
                    Speak to Admin
                  </button>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/10 px-4 py-3 text-sm text-white/40">
                    No handover offer yet.
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ role, content }: { role: 'visitor' | 'assistant'; content: string }) => {
  const isVisitor = role === 'visitor';

  return (
    <div className={`flex ${isVisitor ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${isVisitor
            ? 'rounded-br-md bg-cyan-300 text-slate-950'
            : 'rounded-bl-md border border-white/10 bg-white/[0.05] text-white/88'
          }`}
      >
        {content}
      </div>
    </div>
  );
};

const StatusCard = ({ label, value, tone = 'text-white' }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
    <p className={`mt-3 break-all text-sm md:text-base ${tone}`}>{value}</p>
  </div>
);

const MetaRow = ({ label, value }) => (
  <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">{label}</p>
    <p className="mt-2 break-all text-sm text-white/75">{value}</p>
  </div>
);
