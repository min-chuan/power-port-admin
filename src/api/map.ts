import type { StationPoint } from '@/types/map';
import { post } from '@/utils/http';

enum API {
  MapList = '/mapList',
}

export function mapListApi() {
  return post<undefined, StationPoint[]>(API.MapList);
}
