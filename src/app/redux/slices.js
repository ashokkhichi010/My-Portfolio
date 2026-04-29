import { createSlice } from '@reduxjs/toolkit';
import { mergeState } from './commonReducers';

const initialState = {
  sessionId: null,
  socketId: null,
  connectionStatus: 'idle',
  isRehydrated: false,
  isRestored: false,
  connectedAt: null,
  messages: [],
  isAwaitingAi: false,
  showHandoverButton: false,
  handoverStatus: 'AI',
  handoverCountdownMs: 0,
  handoverExpiresAt: null,
  adminBusy: false,
  isRequestingHandover: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    rehydrationComplete(state) {
      state.isRehydrated = true;
    },
    setConnectionStatus(state, action) {
      state.connectionStatus = action.payload;
    },
    setSessionReady(state, action) {
      const {
        sessionId,
        socketId,
        connectedAt,
        isRestored,
        messages = [],
        handoverOffered = false,
        handoverStatus = 'AI',
        handoverExpiresAt = null,
      } = action.payload;
      state.sessionId = sessionId;
      state.socketId = socketId;
      state.connectionStatus = 'connected';
      state.connectedAt = connectedAt;
      state.isRestored = isRestored;
      state.messages = messages;
      state.showHandoverButton = handoverOffered;
      state.isAwaitingAi = false;
      state.handoverStatus = handoverStatus;
      state.handoverExpiresAt = handoverExpiresAt;
      state.handoverCountdownMs = handoverExpiresAt ? Math.max(0, new Date(handoverExpiresAt).getTime() - Date.now()) : 0;
      state.adminBusy = handoverStatus === 'ADMIN_BUSY';
      state.isRequestingHandover = false;
    },
    setSocketId(state, action) {
      state.socketId = action.payload;
    },
    resetConnection(state) {
      state.socketId = null;
      state.connectionStatus = 'disconnected';
      state.isAwaitingAi = false;
    },
    addMessage(state, action) {
      const message = action.payload;
      const existingIndex = state.messages.findIndex((item) => item.id === message.id);

      if (existingIndex >= 0) {
        state.messages[existingIndex] = message;
      } else {
        state.messages.push(message);
      }

      state.messages = state.messages.slice(-100);
      state.isAwaitingAi = message.role === 'visitor';
      if (message.role === 'assistant') {
        state.isAwaitingAi = false;
      }
    },
    setHandoverOffer(state, action) {
      state.showHandoverButton = action.payload;
    },
    setAwaitingAi(state, action) {
      state.isAwaitingAi = action.payload;
    },
    setRequestingHandover(state, action) {
      state.isRequestingHandover = action.payload;
    },
    setHandoverRequested(state, action) {
      state.handoverStatus = 'HANDOVER_REQUESTED';
      state.handoverExpiresAt = action.payload.expiresAt;
      state.handoverCountdownMs = action.payload.timeoutMs;
      state.adminBusy = false;
      state.isRequestingHandover = false;
    },
    tickHandoverCountdown(state, action) {
      state.handoverCountdownMs = Math.max(0, action.payload);
    },
    setAdminBusy(state) {
      state.handoverStatus = 'ADMIN_BUSY';
      state.handoverExpiresAt = null;
      state.handoverCountdownMs = 0;
      state.adminBusy = true;
      state.isRequestingHandover = false;
    },
    setHandoverAccepted(state) {
      state.handoverStatus = 'LIVE';
      state.handoverExpiresAt = null;
      state.handoverCountdownMs = 0;
      state.adminBusy = false;
      state.isRequestingHandover = false;
    },
    mergeChatState: mergeState,
  },
});

export const {
  rehydrationComplete,
  setConnectionStatus,
  setSessionReady,
  setSocketId,
  resetConnection,
  addMessage,
  setHandoverOffer,
  setAwaitingAi,
  setRequestingHandover,
  setHandoverRequested,
  tickHandoverCountdown,
  setAdminBusy,
  setHandoverAccepted,
  mergeChatState,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
