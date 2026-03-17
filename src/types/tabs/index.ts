import type { LocationQueryRaw } from 'vue-router';
import type { MenuItem } from '../user';
export interface TabItem extends MenuItem {
  query?: LocationQueryRaw;
}
