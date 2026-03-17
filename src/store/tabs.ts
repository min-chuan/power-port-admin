import router from '@/router';
import type { TabItem } from '@/types/tabs';
import findMenu from '@/utils/findMenu';
import { defineStore } from 'pinia';
import type { Router } from 'vue-router';
import useAuthStore from './auth';

interface TabsState {
  tabs: TabItem[];
  activeName: string;
}

const initialState = (): TabsState => {
  return {
    tabs: [],
    activeName: '',
  };
};

const useTabsStore = defineStore('tabs', {
  state: initialState,
  actions: {
    initialTabs() {
      const authStore = useAuthStore();
      if (this.tabs.length === 0) {
        const path = router.currentRoute.value.path;
        const item = findMenu(path, authStore.menulist);
        if (item) {
          this.add(item);
        }
      }
    },
    add(data: TabItem) {
      if (!this.tabs.some((item) => item.url === data.url)) {
        this.tabs.push(data);
      }
      this.setActiveName(data.url);
    },
    remove(url: string, router: Router) {
      if (this.tabs.length === 1) return;
      const index = this.tabs.findIndex((item) => item.url === url);
      if (index !== -1) {
        const deleteTab = this.tabs[index]!;
        this.tabs.splice(index, 1);
        if (deleteTab.url === this.activeName) {
          const activeTab = this.tabs[this.tabs.length - 1]!;
          this.setActiveName(activeTab.url);
          router.push(activeTab.url);
        }
      }
    },
    setActiveName(activeName: string) {
      this.activeName = activeName;
    },
  },
});

export default useTabsStore;
