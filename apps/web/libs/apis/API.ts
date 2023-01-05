import { instanceStore } from '@apis/instances';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

// type SuspenseResponseType<R> = { read: () => R };
type RestAPIMethodType = <T = unknown, R = T, D = unknown>(
  url: string,
  options?: AxiosRequestConfig<D>
) => Promise<R>;

interface APIParamsInterface {
  instance?: keyof typeof instanceStore;
  suspense?: boolean;
}

interface APIInterface {
  // request: AxiosInstance;
  store: typeof instanceStore;

  get: RestAPIMethodType;
  post: RestAPIMethodType;
  delete: RestAPIMethodType;
  put: RestAPIMethodType;
  patch: RestAPIMethodType;
}

enum API_STATUS {
  pending = 'pending',
  error = 'error',
  success = 'success',
}

/**
 * @description
 *
 * React 18에서는 fetch를 통해 API를 진행하는 예제를 보여주고 있다.
 * 즉 공식적으로 지원하는 게 fetch라 볼 수 있다.
 * 이는 axios도 분명 의존성이 생길 가능성이 있다는 것이다.
 * 따라서 API는 의존성을 느슨하게 관리하기 위한 클래스이다.
 */
export class API implements APIInterface {
  private request: AxiosInstance;

  public constructor({ instance = 'base' }: APIParamsInterface) {
    /**
     * @inner
     * 인스턴스를 게속해서 확장해서 생성하면 어떤 일이 일어날까?
     * 인스턴스에 맞춰 확장된 API가 나와야 하는데 객체에 대한 상속이 많아지면 관리가 어렵다고 느꼈다.
     * 따라서 데코레이터 패턴을 이용해서, 인스턴스 이름 하나가 바뀌더라도 언제든지 끼우면 적용할 수 있게끔 한다.
     *
     * suspense의 경우 타입이 다르다.
     * 따라서 `withSuspense`라는 쟈체 메서드를 제공한다.
     * suspense 여부에 따라서 호출부에서 `withSuspense`를 wrapping하면 된다.
     */
    // this.store = instanceStore;
    this.request = this.store[instance];
  }

  public get store() {
    return instanceStore;
  }

  public get<T = unknown, R = T, D = unknown>(
    url: string,
    options?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request.get<T, R, D>(url, options);
  }

  public post<T = unknown, R = T, D = unknown>(url: string, options?: AxiosRequestConfig<D>) {
    return this.request.post<T, R, AxiosRequestConfig<D>>(url, options);
  }

  public delete<T = unknown, R = T, D = unknown>(url: string, options?: AxiosRequestConfig<D>) {
    return this.request.delete<T, R, D>(url, options);
  }

  public put<T = unknown, R = T, D = unknown>(url: string, options?: AxiosRequestConfig<D>) {
    return this.request.put<T, R, AxiosRequestConfig<D>>(url, options);
  }

  public patch<T = unknown, R = T, D = unknown>(url: string, options?: AxiosRequestConfig<D>) {
    return this.request.patch<T, R, AxiosRequestConfig<D>>(url, options);
  }

  public withSuspense<DataType>(promise: Promise<DataType>) {
    let status: keyof typeof handler = API_STATUS.pending;
    let response: DataType | null = null;
    let error: Error | null = null;

    const suspender = promise
      .then((res: DataType) => {
        status = API_STATUS.success;
        response = res;
      })
      .catch((e: Error) => {
        status = API_STATUS.error;
        error = e;
      });

    const handler = {
      pending() {
        throw suspender;
      },
      error() {
        throw error;
      },
      success(): DataType {
        return response as DataType;
      },
      default(): DataType {
        return response as DataType;
      },
    };

    const read = () => {
      const result = handler[status] ? handler[status]() : handler.default();
      return result;
    };

    return { read };
  }
}

export const request = new API({ instance: 'base' });
