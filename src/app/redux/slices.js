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
  isTyping: false,
  showHandoverButton: false,
  handoverStatus: 'AI',
  handoverCountdownMs: 0,
  handoverExpiresAt: null,
  adminAvailable: false,
  adminBusy: false,
  isRequestingHandover: false,
  visitorGoogleToken: null,
  visitorPushToken: null,
  visitorIdentity: null,
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
        adminAvailable = false,
        visitorEmail = null,
        visitorName = null,
        visitorVerified = false,
      } = action.payload;
      state.sessionId = sessionId;
      state.socketId = socketId;
      state.connectionStatus = 'connected';
      state.connectedAt = connectedAt;
      state.isRestored = isRestored;
      state.messages = messages;
      state.showHandoverButton = handoverOffered;
      state.isAwaitingAi = false;
      state.isTyping = false;
      state.handoverStatus = handoverStatus;
      state.handoverExpiresAt = handoverExpiresAt;
      state.handoverCountdownMs = handoverExpiresAt ? Math.max(0, new Date(handoverExpiresAt).getTime() - Date.now()) : 0;
      state.adminAvailable = adminAvailable;
      state.adminBusy = handoverStatus === 'ADMIN_BUSY';
      state.isRequestingHandover = false;
      if (visitorVerified) {
        state.visitorIdentity = {
          email: visitorEmail,
          name: visitorName,
        };
      }
    },
    setSocketId(state, action) {
      state.socketId = action.payload;
    },
    resetConnection(state) {
      state.socketId = null;
      state.connectionStatus = 'disconnected';
      state.isAwaitingAi = false;
      state.isTyping = false;
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
      if (message.role === 'visitor' && state.handoverStatus === 'AI') {
        state.isTyping = true;
      }
      if (message.role === 'assistant' || message.role === 'admin') {
        state.isAwaitingAi = false;
        state.isTyping = false;
      }
    },
    setHandoverOffer(state, action) {
      state.showHandoverButton = action.payload;
    },
    setAdminAvailability(state, action) {
      state.adminAvailable = action.payload;
    },
    setAwaitingAi(state, action) {
      state.isAwaitingAi = action.payload;
      if (!action.payload) {
        state.isTyping = false;
      }
    },
    setRequestingHandover(state, action) {
      state.isRequestingHandover = action.payload;
    },
    setVisitorIdentity(state, action) {
      state.visitorIdentity = action.payload.identity;
      state.visitorGoogleToken = action.payload.googleToken ?? state.visitorGoogleToken;
      state.visitorPushToken = action.payload.pushToken ?? state.visitorPushToken;
    },
    setHandoverRequested(state, action) {
      state.handoverStatus = 'HANDOVER_REQUESTED';
      state.handoverExpiresAt = action.payload.expiresAt;
      state.handoverCountdownMs = action.payload.timeoutMs;
      state.isTyping = false;
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
      state.isTyping = false;
      state.adminBusy = true;
      state.isRequestingHandover = false;
    },
    setHandoverAccepted(state) {
      state.handoverStatus = 'LIVE';
      state.handoverExpiresAt = null;
      state.handoverCountdownMs = 0;
      state.isTyping = false;
      state.adminBusy = false;
      state.isRequestingHandover = false;
    },
    setHandoverFailed(state, action) {
      state.handoverStatus = action.payload?.status ?? 'AI';
      state.handoverExpiresAt = null;
      state.handoverCountdownMs = 0;
      state.isTyping = false;
      state.adminBusy = false;
      state.isRequestingHandover = false;
      if (typeof action.payload?.adminAvailable === 'boolean') {
        state.adminAvailable = action.payload.adminAvailable;
      }
    },
    setReturnedToAi(state, action) {
      state.handoverStatus = 'AI';
      state.handoverExpiresAt = null;
      state.handoverCountdownMs = 0;
      state.isTyping = false;
      state.adminBusy = false;
      state.isRequestingHandover = false;
      if (typeof action.payload?.adminAvailable === 'boolean') {
        state.adminAvailable = action.payload.adminAvailable;
      }
    },
    mergeChatState: mergeState,
  },
});

const authInitialState = {
  adminUser: null,
  adminAccessToken: null,
  adminRefreshToken: null,
  loginStep: 'credentials',
  otpToken: null,
  otpExpiresAt: null,
  isLoading: false,
  error: null,
  adminFcmToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
    setOtpChallenge(state, action) {
      state.loginStep = 'otp';
      state.otpToken = action.payload.otpToken;
      state.otpExpiresAt = action.payload.expiresAt;
      state.error = null;
      state.isLoading = false;
    },
    setAdminSession(state, action) {
      state.adminUser = action.payload.user;
      state.adminAccessToken = action.payload.accessToken;
      state.adminRefreshToken = action.payload.refreshToken;
      state.loginStep = 'authenticated';
      state.otpToken = null;
      state.otpExpiresAt = null;
      state.error = null;
      state.isLoading = false;
    },
    setAdminFcmToken(state, action) {
      state.adminFcmToken = action.payload;
    },
    resetAdminLoginFlow(state) {
      state.loginStep = 'credentials';
      state.otpToken = null;
      state.otpExpiresAt = null;
      state.isLoading = false;
      state.error = null;
    },
    logoutAdmin(state) {
      Object.assign(state, authInitialState);
    },
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
  setAdminAvailability,
  setAwaitingAi,
  setRequestingHandover,
  setVisitorIdentity,
  setHandoverRequested,
  tickHandoverCountdown,
  setAdminBusy,
  setHandoverAccepted,
  setHandoverFailed,
  setReturnedToAi,
  mergeChatState,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

export const {
  setAuthLoading,
  setAuthError,
  setOtpChallenge,
  setAdminSession,
  setAdminFcmToken,
  resetAdminLoginFlow,
  logoutAdmin,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
