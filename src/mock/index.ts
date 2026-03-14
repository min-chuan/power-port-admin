import type { MockjsRequestOptions } from 'mockjs';
import Mock from 'mockjs';
import { adminMenulist, chargingStation, chargingStation2, userMenulist } from './constant';
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

/* --------------------- 数据看板 ------------------------------- */
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

/* --------------------- 充电站监控 ------------------------------- */
// 获取充电站列表
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation));
Mock.mock(`${baseURL}/stationList`, 'post', (options: any) => {
  let chargingStation = originalChargingStation;
  const data = options.body ? JSON.parse(options.body) : {};
  console.log('充电站监控列表参数', data);
  const { id, name, status, page, pageSize } = data;
  // 根据条件过滤数据
  if (id) {
    chargingStation = chargingStation.filter((item: any) => item.id === id);
  }
  if (name) {
    chargingStation = chargingStation.filter((item: any) => item.name.includes(name));
  }
  if (status != 1) {
    chargingStation = chargingStation.filter((item: any) => item.status === status);
  }
  // 实现分页
  const total = chargingStation.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation.slice(start, start + pageSize);
  return {
    code: 200,
    message: true,
    data: {
      list: paginatedItems,
      total,
    },
  };
});
// 编辑/新增充电站
Mock.mock(`${baseURL}/station/edit`, 'post', (options: any) => {
  const data = JSON.parse(options.body);
  console.log('编辑/新增充电站接口参数', data);
  return {
    code: 200,
    message: '操作成功',
  };
});
// 删除充电站
Mock.mock(`${baseURL}/station/delete`, 'post', (options: any) => {
  const data = JSON.parse(options.body);
  console.log('删除充电站接口参数', data);
  return {
    code: 200,
    message: '操作成功',
  };
});

/* --------------------- 营收统计 ------------------------------- */
// 获取营收统计图表数据
Mock.mock(`${baseURL}/revenueChart`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [
        {
          name: '销售',
          data: [60, 40, 120, 140, 160, 80, 140],
        },
        {
          name: '访问量',
          data: [600, 400, 600, 700, 800, 400, 700],
        },
      ],
    },
  };
});

// 获取营收统计列表
const originalChargingStation2 = JSON.parse(JSON.stringify(chargingStation2));
Mock.mock(`${baseURL}/revenueList`, 'post', (options: any) => {
  let chargingStation2 = originalChargingStation2;
  const data = options.body ? JSON.parse(options.body) : {};
  const { name = '', page = 1, pageSize = 10 } = data;
  // 根据条件过滤数据
  console.log('营收统计表格接口参数', data);
  if (name) {
    chargingStation2 = chargingStation2.filter((item: any) => item.name.includes(name));
  }
  // 实现分页
  const total = chargingStation2.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation2.slice(start, start + pageSize);
  return {
    code: 200,
    message: true,
    data: {
      list: paginatedItems,
      total,
    },
  };
});
