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

Mock.mock(`${baseURL}/chartData`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: [
      { name: '充电桩', value: 35 },
      { name: '充电站', value: 30 },
      { name: '充电杆', value: 25 },
    ],
  };
});

Mock.mock(`${baseURL}/chartData2`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: [
      { name: '充电量', data: [20, 50, 30, 70, 60, 80, 40, 60, 50] },
      { name: '充电时长', data: [40, 60, 50, 80, 70, 90, 60, 70, 80] },
      { name: '充电功率', data: [30, 40, 60, 50, 70, 20, 30, 40, 60] },
    ],
  };
});

Mock.mock(`${baseURL}/chartData3`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [42, 30, 200, 350, 500, 180],
    },
  };
});
