import type { ChargingStationItem, RevenueItem } from '@/types/station';
import { get, post } from '@/utils/http';

enum API {
  List = '/stationList',
  Edit = '/station/edit',
  Delete = '/station/delete',
  RevenueChart = '/revenueChart',
  RevenueList = '/revenueList',
}

interface ListParams {
  page: number;
  pageSize: number;
  name?: string;
  id?: string;
  status: number;
}

interface ListResponse {
  list: ChargingStationItem[];
  total: number;
}

export function listApi(data: ListParams) {
  return post<ListParams, ListResponse>(API.List, data);
}

type EditParams = Required<ChargingStationItem>;

export function editApi(data: EditParams) {
  return post<EditParams, undefined>(API.Edit, data);
}

interface deleteParams {
  id: string;
}
export function deleteApi(data: deleteParams) {
  return post<deleteParams, undefined>(API.Delete, data);
}

interface RevenueChartResponse {
  list: { name: string; data: number[] }[];
}
export function chartApi() {
  return get<undefined, RevenueChartResponse>(API.RevenueChart);
}

interface RevenueListParams {
  page: number;
  pageSize: number;
  name?: string;
}
interface RevenueListResponse {
  list: RevenueItem[];
  total: number;
}
export function revenueListApi(data: RevenueListParams) {
  return post<RevenueListParams, RevenueListResponse>(API.RevenueList, data);
}
