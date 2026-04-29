import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Radio, RefreshCw } from 'lucide-react';
import { SolarBackground } from '../components/SolarBackground';
import socketService from '../hooks/socket';
import { Handler } from '../hooks/socket/handler';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import {
  resetConnection,
  setConnectionStatus,
  setSessionReady,
  setSocketId,
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

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <RefreshCw size={16} />
              <span>
                {chat.isRestored
                  ? 'This browser session was restored from persisted storage.'
                  : 'The first successful handshake will create a new anonymous visitor session.'}
              </span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-white/60 md:grid-cols-2">
              <MetaRow label="Rehydration Gate" value={chat.isRehydrated ? 'Complete' : 'Waiting'} />
              <MetaRow label="Connected At" value={chat.connectedAt ?? 'Pending'} />
            </div>
          </div>
        </div>
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
