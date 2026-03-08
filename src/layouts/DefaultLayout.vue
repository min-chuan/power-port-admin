<template>
  <el-container>
    <el-aside width="200px">
      <Menu />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import Menu from '@/components/navMenu/Menu.vue';
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
.el-main {
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
