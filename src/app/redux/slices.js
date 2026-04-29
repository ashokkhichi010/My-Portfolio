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
      const { sessionId, socketId, connectedAt, isRestored, messages = [], handoverOffered = false } = action.payload;
      state.sessionId = sessionId;
      state.socketId = socketId;
      state.connectionStatus = 'connected';
      state.connectedAt = connectedAt;
      state.isRestored = isRestored;
      state.messages = messages;
      state.showHandoverButton = handoverOffered;
      state.isAwaitingAi = false;
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
  mergeChatState,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
