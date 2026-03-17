<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="searchParams.orderNo" placeholder="请输入订单号" />
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchParams.status" placeholder="订单状态">
          <el-option label="全部" :value="1"></el-option>
          <el-option label="进行中" :value="2"></el-option>
          <el-option label="已完成" :value="3"></el-option>
          <el-option label="异常" :value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchParams.no" placeholder="设备编号" />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="myHandleReset">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt">
      <el-col :span="6">
        <el-input v-model="searchParams.name" placeholder="请输入站点名称" />
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="date"
          range-separator="/"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="handleDateChange"
        />
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-button type="danger" :disabled="disabled" @click="handleBatchDelete">批量删除</el-button>
    <el-button type="primary" :disabled="disabled" icon="Download" @click="handleExport"
      >导出订单数据到Excel</el-button
    >
  </el-card>
  <el-card class="mt">
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="订单号" prop="orderNo"></el-table-column>
      <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
      <el-table-column label="订单日期" prop="date"></el-table-column>
      <el-table-column label="开始时间" prop="startTime"></el-table-column>
      <el-table-column label="结束时间" prop="endTime"></el-table-column>
      <el-table-column label="金额" prop="money"></el-table-column>
      <el-table-column label="支付方式" prop="pay"></el-table-column>
      <el-table-column label="订单状态" prop="status">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 2" type="success">进行中</el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="primary">已完成</el-tag>
          <el-tag v-else-if="scope.row.status == 4" type="warning">异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleDetail((scope.row as OrderItem).orderNo)"
            >详情</el-button
          >
          <el-button type="danger" size="small">删除</el-button>
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
</template>
<script setup lang="ts">
import { batchDeleteApi } from '@/api/operations';
import { useHttp } from '@/hooks/useHttp';
import useAuthStore from '@/store/auth';
import useCacheStore from '@/store/cache';
import useTabsStore from '@/store/tabs';
import type { OrderItem } from '@/types/operations';
import findMenu from '@/utils/findMenu';
import { ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import { computed, onActivated, onDeactivated, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

const {
  dataList,
  loading,
  total,
  pageInfo,
  searchParams,
  loadData,
  handleSizeChange,
  handleCurrentChange,
  handleReset,
} = useHttp('/orderList', {
  orderNo: '',
  status: 1,
  no: '',
  name: '',
  startDate: '',
  endDate: '',
});

const date = ref('');
const myHandleReset = () => {
  handleReset();
  date.value = '';
};
const handleDateChange = (value: string[] | null) => {
  if (!value) {
    searchParams.value.startDate = '';
    searchParams.value.endDate = '';
  } else {
    searchParams.value.startDate = value[0]!;
    searchParams.value.endDate = value[1]!;
  }
};

/* 滚动条缓存功能 */
const savedScrollTop = ref(0);
const cacheStore = useCacheStore();
onDeactivated(() => {
  savedScrollTop.value = cacheStore.scrollTop;
});

onActivated(() => {
  cacheStore.scrollTo(savedScrollTop.value);
});

/* 选择操作 */
const tableRef = useTemplateRef('tableRef');
const selectionList = ref<OrderItem[]>([]);
const disabled = computed(() => {
  return selectionList.value.length === 0;
});
const handleSelectChange = (selection: OrderItem[]) => {
  selectionList.value = selection;
};
const handleBatchDelete = async () => {
  try {
    const res = await batchDeleteApi(selectionList.value.map((item) => item.orderNo));
    ElMessage.success(res.message);
    loadData();
  } catch (err) {
    console.log('error', err);
  }
};
const clearSelection = () => {
  if (tableRef.value) {
    tableRef.value.clearSelection();
  }
};

/* 导出为Excel */
const handleExport = () => {
  // 1. 将数据转换为工作表
  const worksheet = XLSX.utils.json_to_sheet(selectionList.value);

  // 2. 创建工作簿并添加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 3. 生成Excel文件
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  // 4. 创建Blob对象并下载
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  saveAs(blob, '用户数据.xlsx');

  clearSelection();
};

/* 详情功能 */
const authStore = useAuthStore();
const menu = findMenu('/operations/detail', authStore.menulist);
const tabsStore = useTabsStore();
const router = useRouter();
const handleDetail = (orderNo: string) => {
  const query = { orderNo };
  menu && tabsStore.add({ ...menu, query });
  router.push({ path: '/operations/detail', query });
};
</script>
