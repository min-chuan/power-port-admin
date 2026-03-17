import type { OrderItem } from '@/types/operations';
import { post } from '@/utils/http';

enum API {
  OrderList = '/orderList',
  BatchDelete = '/batchDelete',
}

interface OrderListParams {
  orderNo: string;
  status: number;
  no: string;
  name: string;
  startDate: string;
  endDate: string;
}

interface OrderListResponse {
  list: OrderItem[];
  total: number;
}
export function orderListApi(data: OrderListParams) {
  return post<OrderListParams, OrderListResponse>(API.OrderList, data);
}

export function batchDeleteApi(data: string[]) {
  return post(API.BatchDelete, data);
}
