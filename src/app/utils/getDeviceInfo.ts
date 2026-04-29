export interface DeviceInfo {
  userAgent: string;
  language: string;
  platform: string;
  screen: string;
  timezone: string;
}

export const getDeviceInfo = (): DeviceInfo => ({
  userAgent: window.navigator.userAgent,
  language: window.navigator.language,
  platform: window.navigator.platform,
  screen: `${window.screen.width}x${window.screen.height}`,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'unknown',
});
