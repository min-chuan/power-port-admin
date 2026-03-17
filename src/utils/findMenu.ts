import type { MenuItem } from '@/types/user';

const findMenu = (url: string, menu: MenuItem[]) => {
  const item = menu.find((item: MenuItem) => {
    if (url.includes(item.url)) {
      return true;
    }
  });
  if (item) {
    if (item.url === url) {
      return item;
    } else if (item.children) {
      return findMenu(url, item.children);
    }
  }
  return item;
};

export default findMenu;
