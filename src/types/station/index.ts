export interface ChargingStationItem {
  name: string;
  id: string;
  city: string;
  fast?: number;
  slow?: number;
  status: number;
  now?: number;
  fault?: number;
  person: string;
  tel: string;
}

export interface RevenueItem {
  name: string;
  id: string;
  city: string;
  count: number; // 充电桩总数量
  electricity: number; // 电费
  parkingFee: number; // 停车费
  serviceFee: number; // 服务费
  month: number; // 月度总收入
  member: number; // 会员储值金
  percent: number; // 增长比例
  mpercent: number;
}
