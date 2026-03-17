<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <el-input v-model="filterText" style="width: 80%" placeholder="请输入关键词" class="mb">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="data"
          :props="defaultProps"
          :filter-node-method="filterNode"
          show-checkbox
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        />
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card>
        <template #header>
          <h3>{{ title }}:计费模板</h3>
        </template>
        <el-form ref="formRef" :model="form" :rules="rules" :label-width="110">
          <el-form-item label="模板名称：" prop="name">
            <el-input v-model="form.name" style="width: 240px" placeholder="请输入模板名称" />
          </el-form-item>
          <el-row v-for="(item, index) in form.date" :key="item.id">
            <el-col :span="16">
              <el-form-item
                :label="`时间区间${index + 1}：`"
                :prop="`date.${index}.time`"
                :rules="{ required: true, message: '请输入时间区间', trigger: 'blur' }"
              >
                <el-time-picker
                  v-model="item.time"
                  is-range
                  range-separator=" - "
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="hh:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="电费："
                :prop="`date.${index}.electricity`"
                :rules="{ required: true, message: '请输入电费', trigger: 'blur' }"
              >
                <el-input v-model="item.electricity" type="number" placeholder="请输入电费" />
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-icon class="icon" @click="handleRemove(index)"
                ><RemoveFilled color="red"
              /></el-icon>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">添加时间区间</el-button>
          </el-form-item>
          <el-form-item label="服务费：" prop="service">
            <el-input
              v-model="form.service"
              type="number"
              style="width: 240px"
              placeholder="请输入服务费"
            />
          </el-form-item>
          <el-form-item label="停车费：" prop="parking">
            <el-input
              v-model="form.parking"
              type="number"
              style="width: 240px"
              placeholder="请输入停车费"
            />
          </el-form-item>
          <el-form-item label="特殊备注：">
            <el-input v-model="form.remarks" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">创建</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { cityListApi } from '@/api/operations';
import generateId from '@/utils/generateId';
import {
  ElMessage,
  type FilterNodeMethodFunction,
  type FormInstance,
  type FormRules,
  type TreeNodeData,
} from 'element-plus';
import { reactive, ref, useTemplateRef, watch } from 'vue';

/* 筛选框 */
const filterText = ref('');

/* 树形控件 */
interface Tree {
  label: string;
  children?: Tree[];
}

const treeRef = useTemplateRef('treeRef');
const defaultProps = {
  children: 'children',
  label: 'label',
};
const data = ref<Tree[]>([]);

watch(filterText, (value) => {
  if (treeRef.value) {
    treeRef.value.filter(value);
  }
});

const loadData = async () => {
  try {
    const res = await cityListApi();
    if (res.data) {
      data.value = res.data as Tree[];
    }
  } catch (err) {
    console.log('error', err);
  }
};

const filterNode: FilterNodeMethodFunction = (value: string, data: TreeNodeData) => {
  if (!value) return true;
  return data.label.includes(value);
};

const handleNodeClick = (data: Tree) => {
  if (!data.children) {
    title.value = data.label;
    handleReset();
  }
};

const handleCheckChange = (data: Tree, checked: boolean, indeterminate: boolean) => {
  console.log(data, checked, indeterminate);
};

loadData();

/* 表单 */
interface FormType {
  name: string;
  service: number | undefined;
  parking: number | undefined;
  remarks: string;
  date: {
    id: string;
    time: [string, string] | [Date, Date] | null;
    electricity: number | undefined;
  }[];
}

const title = ref('');
const formRef = useTemplateRef<FormInstance>('formRef');
const form = ref<FormType>({
  name: '',
  service: undefined,
  parking: undefined,
  remarks: '',
  date: [{ id: generateId(), time: null, electricity: undefined }],
});

const rules = reactive<FormRules<FormType>>({
  name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
  service: [{ required: true, message: '请输入服务费', trigger: 'blur' }],
  parking: [{ required: true, message: '请输入停车费', trigger: 'blur' }],
});

const handleAdd = () => {
  form.value.date.push({ id: generateId(), time: null, electricity: undefined });
};
const handleRemove = (index: number) => {
  if (form.value.date.length > 1) {
    form.value.date.splice(index, 1);
  }
};
const handleSubmit = () => {
  if (formRef.value) {
    formRef.value.validate((isValid) => {
      if (isValid) {
        // 发送请求
        ElMessage.success('操作成功');
        handleReset();
      }
    });
  }
};
const handleReset = () => {
  form.value = {
    name: '',
    service: undefined,
    parking: undefined,
    remarks: '',
    date: [{ id: generateId(), time: null, electricity: undefined }],
  };
};
</script>
<style lang="less" scoped>
.icon {
  cursor: pointer;
  margin-top: 7px;
  margin-left: 10px;
}
</style>
