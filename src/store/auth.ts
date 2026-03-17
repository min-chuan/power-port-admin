import { loginApi, type LoginParams } from '@/api/user';
import type { MenuItem } from '@/types/user';
import { defineStore } from 'pinia';

interface AuthStore {
  token: string;
  roles: string[];
  username: string;
  menulist: MenuItem[];
}

const initialState = (): AuthStore => {
  try {
    return {
      token: sessionStorage.getItem('token') || '',
      roles: JSON.parse(sessionStorage.getItem('roles') || '[]'),
      username: sessionStorage.getItem('username') || '',
      menulist: JSON.parse(sessionStorage.getItem('menulist') || '[]'),
    };
  } catch (err) {
    console.log('error', err);
    return { token: '', roles: [], username: '', menulist: [] };
  }
};

export const useAuthStore = defineStore('auth', {
  state: initialState,
  getters: {},
  actions: {
    async login(data: LoginParams) {
      try {
        const res = await loginApi(data);
        if (res.data) {
          const {
            token,
            user: { username, roles },
            menulist,
          } = res.data;
          this.token = token;
          this.roles = roles;
          this.username = username;
          this.menulist = menulist;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('roles', JSON.stringify(roles));
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('menulist', JSON.stringify(menulist));
        }
      } catch (err) {
        console.log('error', err);
      }
    },
    logout() {
      this.token = '';
      this.roles = [];
      this.username = '';
      this.menulist = [];
      sessionStorage.clear();
    },
  },
});

export default useAuthStore;
