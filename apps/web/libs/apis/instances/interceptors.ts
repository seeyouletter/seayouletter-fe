import { AxiosError, AxiosResponse } from 'axios';

export function commonResponseInterceptorSuccessCallback(response: AxiosResponse) {
  return response.data;
}

export function commonResponseInterceptorErrorCallback(error: AxiosError) {
  return { status: error.status, error: error.message };
}
