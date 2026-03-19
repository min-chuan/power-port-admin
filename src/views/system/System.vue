<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="searchParams.name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="8">
        <el-select v-model="searchParams.department" placeholder="请选择部门">
          <el-option label="全部" value="" />
          <el-option label="总裁办" value="总裁办" />
          <el-option label="技术部" value="技术部" />
          <el-option label="市场部" value="市场部" />
          <el-option label="维修部" value="维修部" />
          <el-option label="运营部" value="运营部" />
          <el-option label="客服部" value="客服部" />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table ref="tableRef" v-loading="loading" :data="dataList">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="身份证号" prop="idNo"></el-table-column>
      <el-table-column label="职位" prop="position">
        <template #default="{ row: { position } }">
          <el-tag type="primary">{{ position }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="部门" prop="department"></el-table-column>
      <el-table-column label="页面权限" prop="pageAuthority">
        <template #default="{ row: { pageAuthority } }">
          <el-tag type="success">{{ pageAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="按钮权限" prop="btnAuthority">
        <template #default="{ row: { btnAuthority } }">
          <el-tag type="info">{{ btnAuthority }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleConfig(row)">权限设置</el-button>
          <el-button type="danger" size="small">删除</el-button>
          <el-button type="danger" size="small">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      class="fr mt"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <AuthModal
    :visible="visible"
    :checked-keys="checkedKeys"
    :btn-auth="btnAuth"
    :account="account"
    @close="handleClose"
    @reload="loadData"
  />
</template>
<script setup lang="ts">
import { userAuthApi } from '@/api/system';
import { useHttp } from '@/hooks/useHttp';
import type { PermissionItem } from '@/types/system';
import type { MenuItem } from '@/types/user';
import { ref } from 'vue';
import AuthModal from './components/AuthModal.vue';
interface SearchType {
  department: string;
  name: string;
}
const {
  searchParams,
  loadData,
  loading,
  handleReset,
  dataList,
  handleSizeChange,
  handleCurrentChange,
  total,
  pageInfo,
} = useHttp<PermissionItem, SearchType>('/permissionList', { department: '', name: '' });

/* 权限分配弹窗 */
const account = ref<string>('');
const checkedKeys = ref<string[]>([]);
const btnAuth = ref<string[]>([]);
const visible = ref(false);
const handleConfig = async (permission: PermissionItem) => {
  account.value = permission.account;
  await getUserAuth(permission);
  handleOpen();
};

const collectKeys = (list: MenuItem[]): string[] => {
  return list.reduce((res, item) => {
    if (item.children && item.children.length) {
      res.push(...collectKeys(item.children));
      return res;
    } else {
      res.push(item.url);
      return res;
    }
  }, [] as string[]);
};
const getUserAuth = async (permission: PermissionItem) => {
  try {
    const res = await userAuthApi({ pageAuthority: permission.pageAuthority });
    if (res.data) {
      const { list, btn } = res.data;
      checkedKeys.value = collectKeys(list);
      btnAuth.value = btn;
    }
  } catch (err) {
    console.log('error', err);
  }
};
const handleOpen = async () => {
  visible.value = true;
};
const handleClose = () => {
  visible.value = false;
};
</script>
<style lang="less" scoped></style>
