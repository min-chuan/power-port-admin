import type { MenuItem } from '../user';

export type Position =
  | '客服专员'
  | '客服经理'
  | '市场专员'
  | '市场经理'
  | '运营专员'
  | '运营经理'
  | '技术工程师'
  | '技术经理'
  | 'Boss';

export type Department = '总裁办' | '技术部' | '市场部' | '维修部' | '运营部' | '客服部';
export type PageAuth = 'admin' | 'manager' | 'user' | '自定义权限';
export type BtnAuth = 'add' | 'delete' | 'edit' | 'all' | '自定义权限';

export interface PermissionItem {
  name: string; // 姓名
  account: string; //账号
  phone: string; // 电话
  idNo: string; // 身份证号
  position: Position; //职位
  department: Department; //所属部门
  pageAuthority: PageAuth; //页面权限
  btnAuthority: BtnAuth; //按钮权限
}

export interface UserAuthResponse {
  list: MenuItem[];
  btn: string[];
}
