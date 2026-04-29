export interface ApiSuccessEnvelope<T> {
  data?: T;
  message?: string;
  status?: boolean;
  statusCode?: number;
}

export interface ApiErrorShape {
  error: true;
  message: string;
  statusCode?: number;
}

export const extractDataFromResponse = async <T>(response: Response): Promise<T> => {
  const payload = (await response.json().catch(() => ({}))) as ApiSuccessEnvelope<T> | T;

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : 'Request failed.';

    throw {
      error: true,
      message,
      statusCode: response.status,
    } satisfies ApiErrorShape;
  }

  if (
    typeof payload === 'object' &&
    payload &&
    'data' in payload &&
    payload.data !== undefined
  ) {
    return payload.data as T;
  }

  return payload as T;
};

export const parseApiErrorResponse = (error: unknown): ApiErrorShape => {
  if (typeof error === 'object' && error && 'message' in error) {
    const statusCode =
      'statusCode' in error && typeof error.statusCode === 'number' ? error.statusCode : undefined;

    return {
      error: true,
      message: String(error.message),
      statusCode,
    };
  }

  return {
    error: true,
    message: 'Something went wrong. Please try again later.',
  };
};
