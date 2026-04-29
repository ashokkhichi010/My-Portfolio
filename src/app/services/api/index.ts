import config from '../../config/config';
import { getDeviceInfo } from '../../utils/getDeviceInfo';
import apiRoutes from './apis_routes';
import { extractDataFromResponse, parseApiErrorResponse } from './api_utils';

type RequestOptions<TBody = unknown> = {
  route: { url: string; method: string; requiresAuth?: boolean };
  body?: TBody;
  accessToken?: string | null;
};

type AdminLoginResponse = {
  otpToken: string;
  expiresAt: string;
  requires2fa: boolean;
};

type AdminVerifyResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: 'ADMIN';
    displayName?: string;
  };
};

type RegisterAdminDevicePayload = {
  deviceId: string;
  fcmToken: string;
  platform?: string;
  userAgent?: string;
};

const createHeaders = (accessToken?: string | null): HeadersInit => {
  const device = getDeviceInfo();
  const headers: Record<string, string> = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    environment: 'local',
    'device-type': 'web',
    'device-name': device.deviceName,
    'device-id': device.deviceId,
    'device-token': device.deviceId,
    'os-version': device.appVersion,
    'device-platform': device.devicePlatform,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

const callApi = async <TResponse, TBody = unknown>({
  route,
  body,
  accessToken,
}: RequestOptions<TBody>): Promise<TResponse> => {
  try {
    const response = await fetch(`${config.apiBaseUrl}${route.url}`, {
      method: route.method,
      headers: createHeaders(accessToken),
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    return await extractDataFromResponse<TResponse>(response);
  } catch (error) {
    throw parseApiErrorResponse(error);
  }
};

export const authApi = {
  adminLogin(email: string, password: string) {
    return callApi<AdminLoginResponse, { email: string; password: string }>({
      route: apiRoutes.auth.adminLogin,
      body: { email, password },
    });
  },

  adminVerifyOtp(otpToken: string, otp: string) {
    return callApi<AdminVerifyResponse, { otpToken: string; otp: string }>({
      route: apiRoutes.auth.adminVerifyOtp,
      body: { otpToken, otp },
    });
  },

  adminRefresh(refreshToken: string) {
    return callApi<Pick<AdminVerifyResponse, 'accessToken' | 'refreshToken'>, { refreshToken: string }>({
      route: apiRoutes.auth.adminRefresh,
      body: { refreshToken },
    });
  },

  adminLogout(accessToken: string, refreshToken: string) {
    return callApi<{ success: boolean }, { refreshToken: string }>({
      route: apiRoutes.auth.adminLogout,
      accessToken,
      body: { refreshToken },
    });
  },
};

export const devicesApi = {
  registerAdminDevice(accessToken: string, payload: RegisterAdminDevicePayload) {
    return callApi<{ success: boolean }, RegisterAdminDevicePayload>({
      route: apiRoutes.devices.registerAdminDevice,
      accessToken,
      body: payload,
    });
  },
};
