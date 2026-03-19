import type { MenuItem } from '@/types/user';
import type { MockjsRequestOptions } from 'mockjs';
import Mock from 'mockjs';
import {
  adminMenulist,
  alarmList,
  chargingPile,
  chargingStation,
  chargingStation2,
  cityList,
  managerMenulist,
  stations,
  userMenulist,
} from './constant';
const baseURL = import.meta.env.VITE_BASE_URL;

Mock.setup({
  timeout: '200-600',
});

// 自定义生成随机账号函数
Mock.Random.extend({
  account: function () {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = Mock.mock('@natural(6, 10)');
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
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
  if (username === 'manager' && password === 'manager123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        user: {
          username: '常怀初',
          roles: ['manager'],
        },
        token: 'managertoken123456',
        menulist: managerMenulist,
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

/* --------------------- 充电桩管理 ------------------------------- */
// 获取充电桩列表
Mock.mock(`${baseURL}/currentList`, 'post', () => {
  return {
    code: 200,
    success: true,
    data: chargingPile,
  };
});

/* --------------------- 电子地图 ------------------------------- */
// 获取充电桩坐标
Mock.mock(`${baseURL}/mapList`, 'post', () => {
  return {
    code: 200,
    success: true,
    data: stations,
  };
});

/* --------------------- 订单管理 ------------------------------- */
//获取订单列表
Mock.mock(`${baseURL}/orderList`, 'post', (options: any) => {
  const data = JSON.parse(options.body);
  const { pageSize } = data;
  console.log('获取订单列表参数', data);
  return {
    code: 200,
    message: '成功',
    data: Mock.mock({
      [`list|${pageSize}`]: [
        {
          orderNo: '@string("number", 6)', //订单号
          date: '@date("yyyy-MM-dd")', //订单日期
          startTime: '08:00:23', //开始时间
          endTime: '09:10:11', //结束时间
          'equipmentNo|1': ['B109', 'C227', 'C106', 'D158'], //设备编号
          'money|1': [66.5, 88.9, 22.7, 36.5, 42.0], //金额
          'pay|1': ['微信', '支付宝', '储值卡'], //支付方式
          'status|1': [2, 3, 4], //订单状态
        },
      ],
      total: 54,
    }),
    // 生成55条数据
  };
});

//订单管理-批量删除接口
Mock.mock(`${baseURL}/batchDelete`, 'post', (options: any) => {
  const data = JSON.parse(options.body);
  console.log('订单管理批量删除接口', data);
  return {
    code: 200,
    message: '成功',
    data: '操作成功',
  };
});

/* --------------------- 计费管理 ------------------------------- */
//计费管理城市接口
Mock.mock(`${baseURL}/cityList`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: cityList,
  };
});

/* --------------------- 报警管理 ------------------------------- */
Mock.mock(`${baseURL}/alarmList`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: alarmList,
  };
});

/* --------------------- 会员卡管理 ------------------------------- */
//会员卡管理接口
Mock.mock(`${baseURL}/member`, 'post', (req: any) => {
  const data = JSON.parse(req.body);
  const { pageSize } = data;
  console.log('会员管理接口', data);
  return {
    code: 200,
    message: '操作成功',
    data: Mock.mock({
      [`list|${pageSize}`]: [
        {
          memberCardNumber: '@id', // 会员卡号
          'cardType|1': ['普通卡', 'VIP卡', '季卡'], // 卡类型
          issueDate: '@date("yyyy-MM-dd")', // 开卡日期
          holderName: '@cname', // 持有人姓名
          holderPhone: /^1[3-9]\d{9}$/, // 持有人电话
          cardBalance: '@float(100, 10000, 2, 2)', // 卡余额
          'transactionRecords|1-5': [
            {
              // 消费记录
              'transactionDate|1': ['2024-02-18', '2024-04-08', '2024-10-03', '2024-10-15'], // 消费日期
              transactionAmount: '@float(10, 500, 2, 2)', // 消费金额
              'transactionType|1': ['充电扣款', '服务费扣款', '停车费扣款', '其他'], // 消费类型
            },
          ],
          validUntil: '@date("yyyy-MM-dd")', // 有效期至
        },
      ],
      total: 53,
    }),
  };
});

/* --------------------- 招商管理 ------------------------------- */
//招商管理分类列表接口
Mock.mock(`${baseURL}/document`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: {
      type: ['招商类', '广告类', '公告类', '提示类', '日常类', '告警类', '其他'], //文章类型
      important: ['一级', '二级', '三级', '四级'], //重要程度
      publish: ['站内信', '公众号', '小程序', 'H5', '官网'], //发布渠道
    },
  };
});

//权限设置页面

Mock.mock(`${baseURL}/permissionList`, 'post', (req: any) => {
  const data = JSON.parse(req.body);
  const { pageSize } = data;
  console.log('权限设置接口收到参数', data);
  return {
    code: 200,
    message: '操作成功',
    data: Mock.mock({
      [`list|${pageSize}`]: [
        {
          name: '@cname', // 姓名
          account: '@account', //账号
          phone: /^1[3-9]\d{9}$/, // 电话
          idNo: '@id', // 身份证号
          'position|1': [
            '客服专员',
            '客服经理',
            '市场专员',
            '市场经理',
            '运营专员',
            '运营经理',
            '技术工程师',
            '技术经理',
            'Boss',
          ], //职位
          'department|1': ['总裁办', '技术部', '市场部', '维修部', '运营部', '客服部'], //所属部门
          'pageAuthority|1': ['admin', 'manager', 'user', '自定义权限'], //页面权限
          'btnAuthority|1': ['add', 'delete', 'edit', 'all', '自定义权限'], //按钮权限
        },
      ],
      total: 41,
    }),
  };
});

/* --------------------- 系统管理 ------------------------------- */
// 获取所有菜单数据
Mock.mock(`${baseURL}/allMenuList`, 'get', () => {
  return {
    code: 200,
    message: '操作成功',
    data: adminMenulist,
  };
});

//获取当前用户权限
Mock.mock(`${baseURL}/userAuth`, 'post', (req: any) => {
  const data = JSON.parse(req.body);
  const { pageAuthority } = data;
  console.log('后端收到当前权限参数', data);
  const authMap: Record<string, MenuItem[]> = {
    user: userMenulist,
    manager: managerMenulist,
    admin: adminMenulist,
  };
  const btnAuthMap: Record<string, string[]> = {
    user: ['add'],
    manager: ['add', 'edit'],
    admin: ['all', 'add', 'edit', 'delete'],
  };
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: authMap[pageAuthority],
      btn: btnAuthMap[pageAuthority],
    },
  };
});

//权限设置接口
Mock.mock(`${baseURL}/setAuth`, 'post', (req: any) => {
  const data = JSON.parse(req.body);
  console.log('权限设置接口修改账号权限', data);
  return {
    code: 200,
    message: '操作成功',
    data: null,
  };
});
