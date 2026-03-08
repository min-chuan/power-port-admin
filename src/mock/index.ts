import type { MockjsRequestOptions } from 'mockjs';
import Mock from 'mockjs';
import { adminMenulist, userMenulist } from './constant';
const baseURL = import.meta.env.VITE_BASE_URL;

Mock.setup({
  timeout: '200-600',
});

Mock.mock(`${baseURL}/login`, 'post', (options: MockjsRequestOptions) => {
  const data = JSON.parse(options.body);
  console.log(data);
  const { username, password } = data;
  if (username === 'admin' && password === 'admin123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        user: {
          username: '民川',
          roles: ['admin'],
        },
        token: 'admintoken123456',
        menulist: adminMenulist,
      },
    };
  }
  if (username === 'user' && password === 'user123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        user: {
          username: '常怀初',
          roles: ['user'],
        },
        token: 'usertoken123456',
        menulist: userMenulist,
      },
    };
  }
  return {
    code: 401,
    message: '用户名或密码错误',
  };
});
