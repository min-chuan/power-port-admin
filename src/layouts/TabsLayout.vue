<template>
  <el-tabs
    :model-value="activeName"
    closable
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
    @edit="handleTabsEdit"
  >
    <el-tab-pane v-for="item in tabs" :key="item.url" :name="item.url">
      <template #label>
        <span class="custom-tabs-label vertical-center">
          <el-icon class="icon">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <RouterView />
</template>
<script lang="ts" setup>
import useAuthStore from '@/store/auth';
import useTabsStore from '@/store/tabs';
import type { MenuItem } from '@/types/user';
import type { TabsPaneContext } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const tabsStore = useTabsStore();
const authStore = useAuthStore();
const { tabs, activeName } = storeToRefs(tabsStore);
const router = useRouter();
const route = useRoute();

const initialTabs = () => {
  if (tabs.value.length === 0) {
    const path = route.path;
    const findMenuItem = (menulist: MenuItem[], path: string): MenuItem | undefined => {
      const item = menulist.find((item) => path.includes(item.url));
      if (item && item.url === path) {
        return item;
      }
      if (item && item.url !== path && item.children) {
        return findMenuItem(item.children, path);
      }
      return;
    };
    const item = findMenuItem(authStore.menulist, path);

    if (item) {
      tabsStore.add(item);
    }
  }
};

initialTabs();

const handleClick = (tab: TabsPaneContext) => {
  if (tab.index) {
    const index = +tab.index;
    const currentTab = tabs.value[index];
    if (currentTab) {
      const { url } = currentTab;
      tabsStore.setActiveName(url);
      router.push(url);
    }
  }
};

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'remove') {
    console.log(targetName, action);
    tabsStore.remove(targetName, router);
  }
};
</script>
<style lang="less" scoped>
.demo-tabs {
  :deep(.is-active) {
    background-color: rgb(34, 136, 255);
    color: #fff;
  }
  .icon {
    margin-top: 3px;
    margin-right: 5px;
  }
}
</style>
