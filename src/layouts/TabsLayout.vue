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
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="cacheList">
      <component :is="Component" :key="$route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>
<script lang="ts" setup>
import useCacheStore from '@/store/cache';
import useTabsStore from '@/store/tabs';
import type { TabsPaneContext } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const tabsStore = useTabsStore();
const cacheStore = useCacheStore();
const { tabs, activeName } = storeToRefs(tabsStore);
const { cacheList } = storeToRefs(cacheStore);
const router = useRouter();

/* 页签导航功能 */
tabsStore.initialTabs();

const handleClick = (tab: TabsPaneContext) => {
  if (tab.index) {
    const index = +tab.index;
    const currentTab = tabs.value[index];
    if (currentTab) {
      const { url, query } = currentTab;
      tabsStore.setActiveName(url);
      router.push({ path: url, query });
    }
  }
};

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'remove') {
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
