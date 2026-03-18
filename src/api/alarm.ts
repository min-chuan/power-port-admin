import type { AlarmItem } from '@/types/alarm';
import { get } from '@/utils/http';

enum API {
  AlarmList = '/alarmList',
}

export function alarmListApi() {
  return get<undefined, AlarmItem[]>(API.AlarmList);
}
