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
  });

  return res;
};
