import useAuthStore from '@/store/auth';
import type { DirectiveBinding } from 'vue';

const permission = {
  // 在元素被插入到 DOM 前调用
  beforeMount(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    const authStore = useAuthStore();
    const requirePermission = binding.value;
    if (!authStore.roles.some((role) => requirePermission.includes(role))) {
      el.style.display = 'none';
    }
  },
};

export default permission;
