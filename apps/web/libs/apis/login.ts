import { baseRequest } from './API';

interface LoginParamsInterface {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginParamsInterface) => {
  const res = await baseRequest.post('/login', {
    params: {
      username,
      password,
    },
    withCredentials: true,
  });

  return res;
};

export const loginKakao = async () => {
  const res = await baseRequest.get('/oauth2/authorization/kakao');

  return res;
};

export const loginNaver = async () => {
  const res = await baseRequest.get('/oauth2/authorization/kakao');

  return res;
};
