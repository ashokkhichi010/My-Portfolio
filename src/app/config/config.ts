const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  socketUrl: import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:3000',
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  firebaseAuthDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  firebaseStorageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  firebaseMessagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  firebaseAppId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  firebaseMeasurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
  firebaseVapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY ?? '',
};

export const hasFirebaseConfig = Boolean(
  config.firebaseApiKey &&
    config.firebaseAuthDomain &&
    config.firebaseProjectId &&
    config.firebaseStorageBucket &&
    config.firebaseMessagingSenderId &&
    config.firebaseAppId,
);

export { config };
export default config;
