import type { MenuItem } from '@/types/user';
import { defineStore } from 'pinia';
import type { Router } from 'vue-router';

interface TabsState {
  tabs: MenuItem[];
  activeName: string;
}

const initialState: TabsState = {
  tabs: [],
  activeName: '',
};

const useTabsStore = defineStore('tabs', {
  state: () => {
    return {
      ...initialState,
    };
  },
  actions: {
    add(data: MenuItem) {
      if (!this.tabs.some((item) => item.url === data.url)) {
        this.tabs.push(data);
        this.setActiveName(data.url);
      }
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
