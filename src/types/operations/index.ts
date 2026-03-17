export interface OrderItem {
  orderNo: string; //订单号
  date: string; //订单日期
  startTime: string; //开始时间
  endTime: string; //结束时间
  equipmentNo: string; //设备编号
  money: number; //金额
  pay: string; //支付方式
  status: number; //订单状态
}
