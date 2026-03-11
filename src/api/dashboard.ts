import { get } from '@/utils/http';

enum API {
  ChartData = '/chartData',
  ChartData2 = '/chartData2',
  ChartData3 = '/chartData3',
}

interface ChartItem {
  name: string;
  data: number[];
}

interface ChartItem3 {
  list: number[];
}

export function getChartData() {
  return get<undefined, ChartItem[]>(API.ChartData);
}

export function getChartData2() {
  return get<undefined, ChartItem[]>(API.ChartData2);
}

export function getChartData3() {
  return get<undefined, ChartItem3>(API.ChartData3);
}
