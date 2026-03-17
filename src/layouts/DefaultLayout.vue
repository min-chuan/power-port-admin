<template>
  <el-container>
    <el-aside width="200px">
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <TopHeader />
      </el-header>
      <main ref="scrollContainer" class="main">
        <TabsLayout />
      </main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import Menu from '@/components/navMenu/Menu.vue';
import TopHeader from '@/components/topHeader/TopHeader.vue';
import useCacheStore from '@/store/cache';
import debounce from '@/utils/debounce';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import TabsLayout from './TabsLayout.vue';
/* 滚动条控制 */
const cacheStore = useCacheStore();
const scrollRef = useTemplateRef('scrollContainer');
function handleScroll(e: Event) {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  cacheStore.setScrollTop(scrollTop);
}
const debouncedHandleScroll = debounce(handleScroll, 200);
onMounted(() => {
  if (scrollRef.value) {
    scrollRef.value.addEventListener('scroll', debouncedHandleScroll);
    cacheStore.setScrollElement(scrollRef.value);
  }
});

onUnmounted(() => {
  scrollRef.value?.removeEventListener('scroll', debouncedHandleScroll);
  // 清理 store 中的引用
  cacheStore.setScrollElement(null);
});
</script>

<style lang="less" scoped>
.el-aside {
  height: 100vh;
  box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.el-header {
  padding: 0;
}
.main {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
