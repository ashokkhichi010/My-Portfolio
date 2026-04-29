export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRouteDefinition {
  url: string;
  method: ApiMethod;
  requiresAuth?: boolean;
}

const apiRoutes = {
  auth: {
    adminLogin: {
      url: '/auth/admin/login',
      method: 'POST',
    },
    adminVerifyOtp: {
      url: '/auth/admin/verify',
      method: 'POST',
    },
    adminRefresh: {
      url: '/auth/admin/refresh',
      method: 'POST',
    },
    adminLogout: {
      url: '/auth/admin/logout',
      method: 'POST',
      requiresAuth: true,
    },
  },
  devices: {
    registerAdminDevice: {
      url: '/admin/devices/register',
      method: 'POST',
      requiresAuth: true,
    },
  },
} satisfies Record<string, Record<string, ApiRouteDefinition>>;

export default apiRoutes;
