<template>
  <div class="logo center-both">
    <img :src="logo" alt="" width="34px" height="34px" />
    <h1>动力港</h1>
  </div>
  <el-menu :router="true" :default-active="$route.path">
    <MenuItem v-for="item in list" :key="item.url" :item="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png';
import MenuItem from '@/components/navMenu/MenuItem.vue';
import useAuthStore from '@/store/auth';
const authStore = useAuthStore();
const list = authStore.menulist;
</script>

<style lang="less" scoped>
.logo {
  height: 50px;
  padding: 10px 0;
  h1 {
    margin-left: 10px;
    font-size: 22px;
    color: #333;
  }
}
.el-menu {
  border-right: none;
}
</style>
