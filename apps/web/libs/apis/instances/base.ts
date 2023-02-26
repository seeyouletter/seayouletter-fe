import axios from 'axios';

import {
  commonResponseInterceptorErrorCallback,
  commonResponseInterceptorSuccessCallback,
} from './interceptors';

export const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 2000,
});

baseInstance.interceptors.response.use(
  commonResponseInterceptorSuccessCallback,
  commonResponseInterceptorErrorCallback
);
