import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authApi, devicesApi } from '../services/api';
import { registerAdminPush } from '../utils/adminMessaging';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import { logoutAdmin, setAdminFcmToken } from '../redux/slices';
import socketService from './socket';
import { AdminHandler } from './socket/adminHandler';
import { playIncomingRingtone } from '../services/chat/audio';
import { dedupeMessages } from '../services/chat/messageUtils';
import type { ConversationMessage } from '../components/chat/ConversationPanel';
import type { AdminLeadItem } from '../components/chat/AdminLeadSidebar';

export type AdminLead = AdminLeadItem & {
  visitorVerified: boolean;
  assignedAdminId: string;
  assignedAdminEmail: string;
  handoverTimeoutAt: string | null;
};

export const useAdminChatController = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [incomingLead, setIncomingLead] = useState<AdminLead | null>(null);
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
      onIncomingLead: (lead: AdminLead) => {
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
  }, [auth.adminAccessToken, auth.adminFcmToken, selectedSessionId]);

  useEffect(() => {
    if (!auth.adminAccessToken) {
      return;
    }

    registerAdminPush()
      .then((payload) => {
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

  const returnLeadToAi = (sessionId: string) => {
    if (!sessionId) {
      return;
    }

    socketService.returnToAi(sessionId);
  };

  const closeIncomingLead = () => {
    ringtoneStopRef.current?.();
    setIncomingLead(null);
  };

  return {
    leads,
    selectedSessionId,
    setSelectedSessionId,
    selectedLead,
    draft,
    setDraft,
    incomingLead,
    submitLiveReply,
    handleLogout,
    acceptLead,
    returnLeadToAi,
    closeIncomingLead,
  };
};
