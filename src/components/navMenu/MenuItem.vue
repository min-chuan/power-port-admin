<template>
  <el-sub-menu v-if="item.children && item.children.length" :index="item.url">
    <template #title>
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <MenuItem v-for="item2 in item.children" :key="item2.url" :item="item2" />
  </el-sub-menu>
  <el-menu-item
    v-else
    v-show="item.name !== '订单详情'"
    :index="item.url"
    @click="handleClick(item)"
  >
    <el-icon>
      <component :is="item.icon" />
    </el-icon>
    <span>{{ item.name }}</span>
  </el-menu-item>
</template>
<script lang="ts" setup>
import useTabsStore from '@/store/tabs';
import type { MenuItem } from '@/types/user';

defineProps<{
  item: MenuItem;
}>();
const tabsStore = useTabsStore();
const handleClick = (item: MenuItem) => {
  tabsStore.add(item);
};
</script>
<style lang="less" scoped>
.el-menu-item.is-active {
  background-color: rgba(34, 136, 255);
  color: #fff;
}
</style>
