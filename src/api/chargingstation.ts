import type { ChargingStationItem } from '@/types/station';
import { post } from '@/utils/http';

enum API {
  List = '/stationList',
  Edit = '/station/edit',
  Delete = '/station/delete',
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
