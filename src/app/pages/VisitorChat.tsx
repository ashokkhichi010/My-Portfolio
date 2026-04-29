import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SolarBackground } from '../components/SolarBackground';
import { ConversationPanel } from '../components/chat/ConversationPanel';
import socketService from '../hooks/socket';
import { Handler } from '../hooks/socket/handler';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import { registerVisitorPush } from '../utils/adminMessaging';
import { getExistingVisitorFirebaseToken, signInVisitorWithGoogle } from '../utils/firebaseClient';
import {
  addMessage,
  resetConnection,
  setAdminBusy,
  setConnectionStatus,
  setHandoverAccepted,
  setHandoverOffer,
  setHandoverRequested,
  setRequestingHandover,
  setSessionReady,
  setSocketId,
  setAwaitingAi,
  setVisitorIdentity,
  tickHandoverCountdown,
} from '../redux/slices';

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
        setHandoverRequested,
        setAdminBusy,
        setHandoverAccepted,
      },
    });

    socketService.connect({
      sessionId: chat.sessionId,
      deviceInfo: getDeviceInfo(),
      fcmToken: chat.visitorPushToken,
      handler,
    });

    return () => {
      socketService.disconnect();
    };
  }, [chat.isRehydrated, chat.sessionId, chat.visitorPushToken, dispatch]);

  useEffect(() => {
    if (chat.visitorGoogleToken) {
      return;
    }

    getExistingVisitorFirebaseToken()
      .then((firebaseToken) => {
        if (!firebaseToken) {
          return;
        }

        dispatch(
          setVisitorIdentity({
            googleToken: firebaseToken,
            identity: chat.visitorIdentity,
          }),
        );
      })
      .catch(() => undefined);
  }, [chat.visitorGoogleToken, chat.visitorIdentity, dispatch]);

  useEffect(() => {
    if (!chat.visitorIdentity || chat.visitorPushToken) {
      return;
    }

    registerVisitorPush()
      .then((payload) => {
        if (!payload?.fcmToken) {
          return;
        }

        dispatch(
          setVisitorIdentity({
            pushToken: payload.fcmToken,
            identity: chat.visitorIdentity,
          }),
        );
      })
      .catch(() => undefined);
  }, [chat.visitorPushToken, chat.visitorIdentity, dispatch]);

  useEffect(() => {
    if (!chat.handoverExpiresAt || chat.handoverStatus !== 'HANDOVER_REQUESTED') {
      return;
    }

    const updateCountdown = () => {
      const msLeft = new Date(chat.handoverExpiresAt).getTime() - Date.now();
      dispatch(tickHandoverCountdown(msLeft));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(intervalId);
  }, [chat.handoverExpiresAt, chat.handoverStatus, dispatch]);

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

  const requestHandover = async () => {
    try {
      dispatch(setRequestingHandover(true));
      const firebaseToken = chat.visitorGoogleToken || (await getExistingVisitorFirebaseToken()) || (await signInVisitorWithGoogle());
      const pushPayload = await registerVisitorPush().catch(() => null);
      dispatch(
        setVisitorIdentity({
          googleToken: firebaseToken,
          pushToken: pushPayload?.fcmToken ?? chat.visitorPushToken,
          identity: chat.visitorIdentity,
        }),
      );
      socketService.requestHandover(firebaseToken);
    } catch (error) {
      dispatch(setRequestingHandover(false));
      console.warn('Google sign-in failed:', error);
    }
  };

  const footer = useMemo(() => {
    if (chat.handoverStatus === 'LIVE') {
      return (
        <StatusBanner tone="success">
          Human takeover is live. Your next messages will go directly to the admin.
        </StatusBanner>
      );
    }

    if (chat.handoverStatus === 'HANDOVER_REQUESTED') {
      return (
        <StatusBanner tone="warning">
          Connecting to admin... {formatCountdown(chat.handoverCountdownMs)}
        </StatusBanner>
      );
    }

    if (chat.adminBusy) {
      return (
        <StatusBanner tone="danger">
          Admin is busy right now. Please leave your email, contact number, or detailed message and we will follow up.
        </StatusBanner>
      );
    }

    return (
      <div className="flex flex-wrap items-center gap-3">
        {chat.showHandoverButton ? (
          <button
            type="button"
            onClick={requestHandover}
            disabled={chat.isRequestingHandover}
            className="rounded-2xl border border-emerald-300/30 bg-emerald-300/15 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {chat.isRequestingHandover ? 'Connecting your Google identity...' : 'Speak to Admin'}
          </button>
        ) : (
          <StatusChip value="AI assistant active" />
        )}

        <StatusChip value={chat.connectionStatus === 'connected' ? 'Connected' : 'Reconnecting'} />
        {chat.visitorIdentity?.email ? <StatusChip value={chat.visitorIdentity.email} /> : null}
      </div>
    );
  }, [
    chat.adminBusy,
    chat.connectionStatus,
    chat.handoverCountdownMs,
    chat.handoverStatus,
    chat.isRequestingHandover,
    chat.showHandoverButton,
    chat.visitorGoogleToken,
    chat.visitorIdentity,
    chat.visitorPushToken,
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(76,201,240,0.12),_transparent_35%),linear-gradient(180deg,_#07131d_0%,_#05080c_100%)] text-white">
      <SolarBackground />
      <div className="relative mx-auto flex min-h-screen max-w-6xl px-4 py-4 md:px-6 md:py-6">
        <ConversationPanel
          title={chat.visitorIdentity?.name ? `Chatting as ${chat.visitorIdentity.name}` : 'Portfolio Assistant'}
          subtitle="Ask anything about work, availability, or projects. If needed, switch to a human without leaving the conversation."
          messages={chat.messages}
          draft={draft}
          onDraftChange={setDraft}
          onSubmit={submitMessage}
          inputPlaceholder="Type your message..."
          submitLabel={chat.handoverStatus === 'LIVE' ? 'Send' : 'Ask'}
          disabled={chat.connectionStatus !== 'connected'}
          footer={footer}
          emptyState={
            <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-sm text-white/45">
              Start the conversation here. If the AI cannot help or you want to move faster, request a human handover.
            </div>
          }
        />
      </div>
    </div>
  );
};

const formatCountdown = (value: number) => {
  const totalSeconds = Math.max(0, Math.ceil(value / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const StatusBanner = ({ children, tone }: { children: ReactNode; tone: 'success' | 'warning' | 'danger' }) => {
  const styles =
    tone === 'success'
      ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-50'
      : tone === 'warning'
        ? 'border-amber-300/20 bg-amber-300/10 text-amber-50'
        : 'border-rose-300/20 bg-rose-300/10 text-rose-50';

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${styles}`}>{children}</div>;
};

const StatusChip = ({ value }: { value: string }) => (
  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/65">
    {value}
  </span>
);
