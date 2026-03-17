import useAuthStore from '@/store/auth';
import useCacheStore from '@/store/cache';
import router from './index';

type KeepAlive = boolean | { pages: string[] };

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const isLogin = authStore.token;
  if (!isLogin) {
    if (to.path !== '/login') {
      return { path: '/login' };
    }
  } else {
    if (to.path === '/login') {
      return { path: '/' };
    }
    const needAuth = to.meta.needAuth as string[] | undefined;
    const hasAuth = needAuth ? authStore.roles.some((item) => needAuth.includes(item)) : true;
    if (!hasAuth) {
      return { path: '/' };
    }
  }

  // 页面缓存(确保路由名称与组件名称一致)
  const cacheStore = useCacheStore();
  const toName = to.name as string;
  const fromName = from.name as string;
  if (from.meta.keepAlive) {
    const keepAlive = from.meta.keepAlive as KeepAlive;
    if (typeof keepAlive === 'object') {
      const cacheList = keepAlive.pages;
      if (cacheList.includes(toName)) {
        cacheStore.addCache(fromName);
      } else {
        cacheStore.removeCache(fromName);
      }
    }
  }
  if (to.meta.keepAlive) {
    const keepAlive = to.meta.keepAlive as KeepAlive;
    if (typeof keepAlive === 'object') {
      const cacheList = keepAlive.pages;
      if (cacheList.includes(fromName)) {
        cacheStore.addCache(toName);
      } else {
        cacheStore.removeCache(toName);
      }
    }
  }
});
