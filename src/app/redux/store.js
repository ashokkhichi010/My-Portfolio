import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { chatReducer } from './slices';

const persistedChatReducer = persistReducer(
  {
    key: 'chat',
    storage,
    whitelist: ['sessionId'],
  },
  chatReducer,
);

export const store = configureStore({
  reducer: {
    chat: persistedChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
