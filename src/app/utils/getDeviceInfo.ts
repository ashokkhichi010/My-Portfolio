export interface DeviceInfo {
  userAgent: string;
  language: string;
  platform: string;
  screen: string;
  timezone: string;
  deviceId: string;
  deviceName: string;
  devicePlatform: string;
  deviceName2: string;
  appVersion: string;
  'locale-code': string;
}

const DEVICE_ID_STORAGE_KEY = 'portfolio_device_id';

const getStableDeviceId = () => {
  const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const next =
    window.crypto?.randomUUID?.() ??
    `device-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, next);
  return next;
};

export const getDeviceInfo = (): DeviceInfo => {
  const deviceLanguage = window.navigator.language || 'en';

  return {
    userAgent: window.navigator.userAgent,
    language: deviceLanguage,
    platform: window.navigator.platform,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'unknown',
    deviceId: getStableDeviceId(),
    deviceName: window.navigator.appName,
    devicePlatform: window.navigator.platform,
    deviceName2: window.navigator.appCodeName,
    appVersion: window.navigator.appVersion.split(' ')[0] ?? window.navigator.appVersion,
    'locale-code': deviceLanguage.split('-')[0] === 'en' ? 'en' : deviceLanguage,
  };
};
