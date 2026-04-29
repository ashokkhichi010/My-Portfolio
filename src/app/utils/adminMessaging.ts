import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import config from '../config/config';
import { getDeviceInfo } from './getDeviceInfo';
import { getFirebaseApp } from './firebaseClient';

let unsubscribeForeground: null | (() => void) = null;

export const registerAdminPush = async () => {
  if (!config.firebaseVapidKey || !(await isSupported())) {
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    return null;
  }

  const messaging = getMessaging(getFirebaseApp());
  const fcmToken = await getToken(messaging, {
    vapidKey: config.firebaseVapidKey,
    serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
  });

  if (!unsubscribeForeground) {
    unsubscribeForeground = onMessage(messaging, () => undefined);
  }

  if (!fcmToken) {
    return null;
  }

  const deviceInfo = getDeviceInfo();
  const deviceId = getStableAdminDeviceId(deviceInfo);

  return {
    deviceId,
    fcmToken,
    platform: deviceInfo.platform,
    userAgent: deviceInfo.userAgent,
  };
};

const getStableAdminDeviceId = (deviceInfo: { platform: string; screen: string }) => {
  const storageKey = 'portfolio_admin_device_id';
  const existing = window.localStorage.getItem(storageKey);
  if (existing) {
    return existing;
  }

  const next = `${deviceInfo.platform}-${deviceInfo.screen}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(storageKey, next);
  return next;
};
