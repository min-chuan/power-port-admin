<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model.trim="formParams.input" placeholder="请输入站点名称、ID">
          <template #append>
            <el-select v-model="select" style="width: 115px">
              <el-option label="按名称查询" value="name" />
              <el-option label="按ID查询" value="id" />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="formParams.value" placeholder="充电桩状态">
          <el-option label="全部" :value="1" />
          <el-option label="使用中" :value="2" />
          <el-option label="空闲中" :value="3" />
          <el-option label="维护中" :value="4" />
          <el-option label="待维修" :value="5" />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-row class="tac">
      <el-col :span="6">
        <el-statistic title="累计充电量(度)" :value="268500" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计充电次数(次)" :value="268500" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="服务区域(个)" :value="268500" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="累计效益(元)" :value="268500" />
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-button type="primary" icon="Plus" @click="handleAdd">新增充电站</el-button>
  </el-card>
  <el-card class="mt clear">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="name" label="站点名称" />
      <el-table-column prop="id" label="站点ID" />
      <el-table-column prop="city" label="所属城市" />
      <el-table-column prop="fast" label="快充数" />
      <el-table-column prop="slow" label="慢充数" />
      <el-table-column prop="status" label="充电桩状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 2" type="primary">使用中</el-tag>
          <el-tag v-if="scope.row.status === 3" type="success">空闲中</el-tag>
          <el-tag v-if="scope.row.status === 4" type="warning">维护中</el-tag>
          <el-tag v-if="scope.row.status === 5" type="danger">待维修</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="now" label="正在充电" />
      <el-table-column prop="fault" label="故障数" />
      <el-table-column prop="person" label="站点负责人" />
      <el-table-column prop="tel" label="负责人电话" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定要删除当前站点吗?"
            @confirm="handleDelete((scope.row as ChargingStationItem).id)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
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
  <StationForm :visible="dialogVisible" @reload="loadData" @close="handleClose" />
</template>
<script setup lang="ts">
import { deleteApi, listApi } from '@/api/chargingstation';
import useStationStore from '@/store/station';
import type { ChargingStationItem } from '@/types/station';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import StationForm from './components/StationForm.vue';
const select = ref('name');
const total = ref(0);
const loading = ref(false);
const pageInfo = reactive({
  page: 1,
  pageSize: 10,
});
const tableData = ref<ChargingStationItem[]>([]);

const formParams = reactive({
  input: '',
  value: 1,
});

const handleSizeChange = (val: number) => {
  pageInfo.pageSize = val;
  loadData();
};

const handleCurrentChange = (val: number) => {
  pageInfo.page = val;
  loadData();
};

const handleSearch = () => {
  loadData();
};

const handleReset = () => {
  pageInfo.page = 1;
  pageInfo.pageSize = 10;
  select.value = 'name';
  formParams.input = '';
  formParams.value = 1;
  loadData();
};

const handleDelete = async (id: string) => {
  try {
    const res = await deleteApi({ id });
    ElMessage({
      message: res.message,
      type: 'success',
    });
    loadData();
  } catch (err) {
    console.log('error', err);
  }
};

const loadData = async () => {
  try {
    loading.value = true;
    const params = {
      ...pageInfo,
      [select.value]: formParams.input,
      status: formParams.value,
    };
    const res = await listApi(params);
    if (res.data) {
      tableData.value = res.data.list;
      total.value = res.data.total;
    }
  } catch (err) {
    console.log('error', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});

/* 对话框功能 */
const stationStore = useStationStore();
const dialogVisible = ref(false);
const handleAdd = () => {
  stationStore.resetFormData();
  dialogVisible.value = true;
};
const handleEdit = (item: ChargingStationItem) => {
  stationStore.setFormData({ ...item });
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>
