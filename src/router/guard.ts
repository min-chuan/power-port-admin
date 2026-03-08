import useAuthStore from '@/store/auth';
import router from './index';

router.beforeEach((to) => {
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
  }
});
