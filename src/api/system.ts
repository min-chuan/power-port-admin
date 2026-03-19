import type { UserAuthResponse } from '@/types/system';
import type { MenuItem } from '@/types/user';
import { get, post } from '@/utils/http';

enum API {
  AllMenuList = '/allMenuList',
  UserAuth = '/userAuth',
  SetAuth = '/setAuth',
}

export function allMenuListApi() {
  return get<undefined, MenuItem[]>(API.AllMenuList);
}

interface UserAuthParams {
  pageAuthority: string;
}

export function userAuthApi(data: UserAuthParams) {
  return post<UserAuthParams, UserAuthResponse>(API.UserAuth, data);
}

interface SetAuthParams {
  btnList: string[];
  pageList: string[];
  account: string;
}
export function setAuthApi(data: SetAuthParams) {
  return post<SetAuthParams, undefined>(API.SetAuth, data);
}
