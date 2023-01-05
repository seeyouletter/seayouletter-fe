import axios from 'axios';

import {
  commonResponseInterceptorErrorCallback,
  commonResponseInterceptorSuccessCallback,
} from './interceptors';

export const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEB_BASE_URL,
  timeout: 3000,
});

baseInstance.interceptors.response.use(
  commonResponseInterceptorSuccessCallback,
  commonResponseInterceptorErrorCallback
);
