import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEB_BASE_URL,
  timeout: 3000,
});

const requestStore = {
  base: request,
};

interface APIParamsInterface {
  instanceType: keyof typeof requestStore;
}

export class API {
  private request: AxiosInstance;

  public constructor({ instanceType = 'base' }: APIParamsInterface) {
    this.request = requestStore[instanceType];
  }

  public get<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    options?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request.get(url, options);
  }

  public post<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    options?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request.post(url, options);
  }

  public delete<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    options?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request.delete(url, options);
  }

  public put<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    options?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request.put(url, options);
  }

  public patch<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    options?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request.patch(url, options);
  }
}
