import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import type { Analytics } from 'firebase/analytics';
import { config, hasFirebaseConfig } from '../config/config';

// Firebase configuration
const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId,
  measurementId: config.firebaseMeasurementId,
};

let analytics: Analytics | null = null;

export const initializeAnalytics = () => {
  if (!hasFirebaseConfig) {
    console.warn('Firebase Analytics skipped: missing Vite environment variables.');
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  } catch (error) {
    console.warn('Firebase Analytics initialization failed:', error);
  }
};

export const trackPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

export const trackProjectClick = (projectTitle: string) => {
  trackEvent('project_click', {
    project_name: projectTitle,
  });
};

export const trackContactClick = (platform: string) => {
  trackEvent('contact_click', {
    platform,
  });
};
