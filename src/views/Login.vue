<template>
  <div class="login">
    <div class="form">
      <div class="logo center-both">
        <img :src="logo" alt="" width="70px" height="70px" />
        <h1 class="ml">动力港能源管理平台</h1>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="items">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png';
import useAuthStore from '@/store/auth';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

interface Form {
  username: string;
  password: string;
}

const form = reactive<Form>({ username: '', password: '' });
const formRef = useTemplateRef<FormInstance>('formRef');

const authStore = useAuthStore();
const router = useRouter();

const rules = reactive<FormRules<Form>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 4, max: 8, message: '用户名要求4-8位数字字母组合', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    // { pattern: /^d{6}$/, message: '密码必须是6位纯数字', trigger: 'blur' },
  ],
});

const handleLogin = async () => {
  try {
    await formRef.value?.validate(async (valid) => {
      if (valid) {
        await authStore.login(form);
        router.push('/');
      }
    });
  } catch (err) {
    console.log('error1', err);
  }
};
</script>

<style lang="less" scoped>
.login {
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  .form {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10%;
    box-shadow: 0 0 10px 10px #f4f4f4;
    width: 500px;
    height: 300px;
    padding: 50px;
    .logo {
      h1 {
        color: rgb(14, 53, 148);
      }
    }
    .items {
      margin-top: 40px;
    }
  }
}
</style>
