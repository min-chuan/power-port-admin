<template>
  <el-dialog
    :model-value="visible"
    title="权限设置"
    width="600"
    @close="handleClose"
    @open="handleOpen"
  >
    <el-card>
      <template #header>
        <h3>页面权限</h3>
      </template>
      <el-tree
        ref="treeRef"
        style="max-width: 600px"
        :props="treeProps"
        :data="data"
        node-key="url"
        show-checkbox
      />
    </el-card>
    <el-card class="mt">
      <template #header>
        <h3>按钮权限</h3>
      </template>
      <div>
        <el-checkbox-group :model-value="initBtnAuth" @change="handleBtnAuthChange">
          <el-checkbox label="全部" value="all" />
          <el-checkbox label="添加" value="add" />
          <el-checkbox label="编辑" value="edit" />
          <el-checkbox label="删除" value="delete" />
        </el-checkbox-group>
      </div>
    </el-card>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { allMenuListApi, setAuthApi } from '@/api/system';
import type { MenuItem } from '@/types/user';
import { ElMessage, type TreeInstance } from 'element-plus';
import { onMounted, ref, useTemplateRef } from 'vue';

interface Props {
  visible: boolean;
  checkedKeys: string[];
  btnAuth: string[];
  account: string;
}
const { visible, checkedKeys, btnAuth, account } = defineProps<Props>();
const emit = defineEmits(['close', 'reload']);
const handleClose = () => {
  emit('close');
};

/* 页面权限 */
interface Tree {
  label: string;
  children: Tree[];
}
const treeProps = {
  label: 'name',
  children: 'children',
};

/* 设置选中项 */
const treeRef = useTemplateRef<TreeInstance>('treeRef');
const initBtnAuth = ref<string[]>([]);
const handleOpen = () => {
  if (treeRef.value) {
    treeRef.value.setCheckedKeys(checkedKeys);
  }
  initBtnAuth.value = btnAuth;
};
const handleBtnAuthChange = (value: string[]) => {
  initBtnAuth.value = value;
};

/* 提交 */
const handleSubmit = async () => {
  try {
    if (!treeRef.value) return;
    const res = await setAuthApi({
      account,
      pageList: treeRef.value.getCheckedKeys(true) as string[],
      btnList: initBtnAuth.value,
    });
    ElMessage.success(res.message);
    handleClose();
    emit('reload');
  } catch (err) {
    console.log('error', err);
  }
};

/* 获取所有菜单 */
const data = ref<MenuItem[]>([]);
const loadData = async () => {
  try {
    const res = await allMenuListApi();
    if (res.data) {
      data.value = res.data;
    }
  } catch (err) {
    console.log('error', err);
  }
};
onMounted(() => {
  loadData();
});
</script>
