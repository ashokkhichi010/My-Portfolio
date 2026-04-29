import { createSlice } from '@reduxjs/toolkit';
import { mergeState } from './commonReducers';

const initialState = {
  sessionId: null,
  socketId: null,
  connectionStatus: 'idle',
  isRehydrated: false,
  isRestored: false,
  connectedAt: null,
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
      const { sessionId, socketId, connectedAt, isRestored } = action.payload;
      state.sessionId = sessionId;
      state.socketId = socketId;
      state.connectionStatus = 'connected';
      state.connectedAt = connectedAt;
      state.isRestored = isRestored;
    },
    setSocketId(state, action) {
      state.socketId = action.payload;
    },
    resetConnection(state) {
      state.socketId = null;
      state.connectionStatus = 'disconnected';
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
  mergeChatState,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
