import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import config, { hasFirebaseConfig } from '../config/config';

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId,
  measurementId: config.firebaseMeasurementId,
};

export const getFirebaseApp = () => {
  if (!hasFirebaseConfig) {
    throw new Error('Firebase is not configured for this frontend environment.');
  }

  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

export const signInVisitorWithGoogle = async (): Promise<string> => {
  const auth = getAuth(getFirebaseApp());
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return await result.user.getIdToken();
};
