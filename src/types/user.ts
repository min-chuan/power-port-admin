export interface MenuItem {
  icon: string;
  name: string;
  url: string;
  children?: MenuItem[];
}
