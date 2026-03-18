export interface AlarmItem {
  description: string;
  address: string;
  equNo: string;
  level: number; //1严重 2紧急 3一般
  time: string;
  code: number; //故障代码
  status: number; //1待指派 2处理中 处理异常
}
