import router from '@/router';
import { defineStore } from 'pinia';

interface CacheState {
  /** 需要缓存的组件名称列表 */
  cacheList: string[];
  scrollTop: number;
  scrollElement: HTMLElement | null;
}

/** 初始化缓存列表 - 从路由配置中读取 keepAlive: true 的路由 */
const initialCacheList = (): string[] => {
  const routes = router.getRoutes().filter((item) => item.meta.keepAlive === true);
  const cacheList = routes.map((item) => item.name as string).filter(Boolean);
  return cacheList;
};

const initialState = (): CacheState => {
  return {
    cacheList: initialCacheList(),
    scrollTop: 0,
    scrollElement: null,
  };
};

const useCacheStore = defineStore('cache', {
  state: initialState,
  actions: {
    scrollTo(value: number) {
      if (this.scrollElement && this.scrollElement.scrollTo) {
        this.scrollElement.scrollTo({ top: value });
      }
    },
    setScrollElement(element: HTMLElement | null) {
      this.scrollElement = element;
    },
    /* 设置滚动条 */
    setScrollTop(value: number) {
      this.scrollTop = value;
    },
    /** 添加组件到缓存列表 */
    addCache(name: string) {
      if (!this.cacheList.includes(name)) {
        this.cacheList.push(name);
      }
    },
    /** 从缓存列表移除组件 */
    removeCache(name: string) {
      const index = this.cacheList.indexOf(name);
      if (index !== -1) {
        this.cacheList.splice(index, 1);
      }
    },
  },
});

export default useCacheStore;
