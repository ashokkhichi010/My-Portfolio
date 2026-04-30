import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketService from './socket';
import { Handler } from './socket/handler';
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
import { ChatStatusBanner } from '../components/chat/ChatStatusBanner';
import { ChatStatusChip } from '../components/chat/ChatStatusChip';
import { formatCountdown } from '../services/chat/messageUtils';

export const useVisitorChatController = () => {
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
      const firebaseToken =
        chat.visitorGoogleToken || (await getExistingVisitorFirebaseToken()) || (await signInVisitorWithGoogle());
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
        <ChatStatusBanner tone="success">
          Human takeover is live. Your next messages will go directly to the admin.
        </ChatStatusBanner>
      );
    }

    if (chat.handoverStatus === 'HANDOVER_REQUESTED') {
      return (
        <ChatStatusBanner tone="warning">
          Connecting to admin... {formatCountdown(chat.handoverCountdownMs)}
        </ChatStatusBanner>
      );
    }

    if (chat.adminBusy) {
      return (
        <ChatStatusBanner tone="danger">
          Admin is busy right now. Please leave your email, contact number, or detailed message and we will follow up.
        </ChatStatusBanner>
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
          <ChatStatusChip value="AI assistant active" />
        )}

        <ChatStatusChip value={chat.connectionStatus === 'connected' ? 'Connected' : 'Reconnecting'} />
        {chat.visitorIdentity?.email ? <ChatStatusChip value={chat.visitorIdentity.email} /> : null}
      </div>
    );
  }, [
    chat.adminBusy,
    chat.connectionStatus,
    chat.handoverCountdownMs,
    chat.handoverStatus,
    chat.isRequestingHandover,
    chat.showHandoverButton,
    chat.visitorIdentity,
    chat.visitorPushToken,
  ]);

  return {
    chat,
    draft,
    setDraft,
    submitMessage,
    footer,
    title: chat.visitorIdentity?.name ? `Chatting as ${chat.visitorIdentity.name}` : 'Portfolio Assistant',
    subtitle:
      'Ask anything about work, availability, or projects. If needed, switch to a human without leaving the conversation.',
    submitLabel: chat.handoverStatus === 'LIVE' ? 'Send' : 'Ask',
  };
};
