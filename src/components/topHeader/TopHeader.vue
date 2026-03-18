<template>
  <div class="header clear">
    <div class="personal fr vertical-center">
      <el-badge is-dot class="message">
        <el-icon><Bell /></el-icon>
      </el-badge>
      <el-avatar
        class="ml mr"
        :size="30"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您, {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User" command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useAuthStore from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { username } = storeToRefs(authStore);
const router = useRouter();

const handleCommand = (command: string) => {
  if (command === 'personal') {
    router.push('/personal');
  } else if (command === 'logout') {
    authStore.logout();
    router.push('/login');
  }
};
</script>
<style lang="less" scoped>
.header {
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  .personal {
    height: 60px;
    .message {
      margin-top: 10px;
    }
  }
}
</style>
