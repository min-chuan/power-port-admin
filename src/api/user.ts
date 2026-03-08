import type { MenuItem } from '@/types/user';
import { post } from '@/utils/http';

enum API {
  Login = '/login',
}

export interface LoginParams {
  username: string;
  password: string;
}

interface LoginData {
  token: string;
  menulist: MenuItem[];
  user: {
    username: string;
    roles: string[];
  };
}

export function loginApi(data: LoginParams) {
  return post<LoginParams, LoginData>(API.Login, data);
}
