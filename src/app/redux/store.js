import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer, chatReducer } from './slices';

const persistedChatReducer = persistReducer(
  {
    key: 'chat',
    storage,
    whitelist: ['sessionId', 'visitorGoogleToken', 'visitorPushToken', 'visitorIdentity'],
  },
  chatReducer,
);

export const store = configureStore({
  reducer: {
    chat: persistedChatReducer,
    auth: persistReducer(
      {
        key: 'auth',
        storage,
        whitelist: ['adminUser', 'adminAccessToken', 'adminRefreshToken', 'adminFcmToken'],
      },
      authReducer,
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
