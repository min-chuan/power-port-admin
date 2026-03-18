<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round mr">
            <el-icon><Document /></el-icon>
          </div>
          <h4>今日总收入（元）</h4>
        </div>
        <div class="total mt">
          <h1>{{ toThousands(6867224) }}</h1>
          <div class="percent" :style="{ color: 'green' }">-21%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round mr">
            <el-icon><Document /></el-icon>
          </div>
          <h4>本月总收入（万元）</h4>
        </div>
        <div class="total mt">
          <h1>{{ toThousands(239824.67) }}</h1>
          <div class="percent" :style="{ color: 'green' }">-7%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round mr">
            <el-icon><Document /></el-icon>
          </div>
          <h4>会员卡储值金额（元）</h4>
        </div>
        <div class="total mt">
          <h1>{{ toThousands(382324) }}</h1>
          <div class="percent" :style="{ color: 'green' }">-4%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round mr">
            <el-icon><Document /></el-icon>
          </div>
          <h4>服务费总金额（元）</h4>
        </div>
        <div class="total mt">
          <h1>{{ toThousands(239824) }}</h1>
          <div class="percent" :style="{ color: 'green' }">-19%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round mr">
            <el-icon><Document /></el-icon>
          </div>
          <h4>停车费总金额（元）</h4>
        </div>
        <div class="total mt">
          <h1>{{ toThousands(22824) }}</h1>
          <div class="percent" :style="{ color: 'green' }">-3%</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card>
        <div class="title">
          <div class="round mr">
            <el-icon><Document /></el-icon>
          </div>
          <h4>电费总金额（元）</h4>
        </div>
        <div class="total mt">
          <h1>{{ toThousands(23824) }}</h1>
          <div class="percent" :style="{ color: 'green' }">-6%</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-card class="mt">
    <div ref="chartRef" class="chart"></div>
  </el-card>
  <el-card class="mt">
    <el-input v-model="searchForm.name" class="search-input" placeholder="请输入站点名称">
      <template #append>
        <el-icon>
          <el-button icon="Search" @click="loadData"></el-button>
        </el-icon>
      </template>
    </el-input>
    <el-table v-loading="loading" class="mt" :data="tableData">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="充电站名称"></el-table-column>
      <el-table-column prop="id" label="充电站ID"></el-table-column>
      <el-table-column prop="city" label="所属城市"></el-table-column>
      <el-table-column prop="count" label="充电桩总量(个)"></el-table-column>
      <el-table-column prop="day" label="单日总收入(元)" sortable>
        <template #default="{ row: { day, percent } }">
          <span>{{ day }}</span>
          <el-tag class="ml" :type="percent > 0 ? 'danger' : 'success'">{{
            percent > 0 ? `+${percent}%` : `${percent}%`
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="month" label="月度总收入(万元)">
        <template #default="{ row: { month, mpercent } }">
          <span>{{ month }}</span>
          <el-tag class="ml" :type="mpercent > 0 ? 'danger' : 'success'">{{
            mpercent > 0 ? `+${mpercent}%` : `${mpercent}%`
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="electricity" label="电费营收(元)"></el-table-column>
      <el-table-column prop="parkingFee" label="停车费营收(元)"></el-table-column>
      <el-table-column prop="serviceFee" label="服务费营收(元)"></el-table-column>
      <el-table-column prop="member" label="会员储值金(元)"></el-table-column>
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
import { chartApi, revenueListApi } from '@/api/chargingstation';
import useChart from '@/hooks/useChart';
import usePagination from '@/hooks/usePagination';
import type { RevenueItem } from '@/types/station';
import toThousands from '@/utils/toThousands';
import type { EChartsCoreOption } from 'echarts';
import { onMounted, reactive, ref, useTemplateRef } from 'vue';
/* 图表显示功能 */
const chartRef = useTemplateRef('chartRef');
const getChartOption = async () => {
  const chartOptions = reactive<EChartsCoreOption>({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
      top: 'top',
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
    },
    yAxis: [
      {
        type: 'value',
        name: '销售',
        position: 'left',
      },
      {
        type: 'value',
        name: '访问量',
        position: 'right',
      },
    ],
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
        yAxisIndex: 0,
        itemStyle: {
          color: '#409eff',
        },
      },
      {
        name: '',
        type: 'line',
        data: [],
        yAxisIndex: 1,
        itemStyle: {
          color: '#409eff',
        },
        smooth: true,
      },
    ],
  });
  try {
    const res = await chartApi();
    (chartOptions.legend as any).data = res.data?.list.map((item) => item.name);
    res.data?.list.forEach((item, index) => {
      (chartOptions.series as any)[index].name = item.name;
      (chartOptions.series as any)[index].data = item.data;
    });
    return chartOptions;
  } catch (err) {
    console.log('error', err);
  }
};
useChart(chartRef, getChartOption);

/* 表格展示功能 */
const searchForm = reactive({
  name: '',
});
const tableData = ref<RevenueItem[]>([]);
const loading = ref(false);

const loadData = async () => {
  try {
    loading.value = true;
    const res = await revenueListApi({ ...pageInfo, ...searchForm });
    if (res.data) {
      tableData.value = res.data.list.map((item) => {
        return {
          ...item,
          day: item.electricity + item.parkingFee + item.serviceFee + item.member,
        };
      });
      setTotal(res.data.total);
    }
  } catch (err) {
    console.log('error', err);
  } finally {
    loading.value = false;
  }
};

/* 分页功能 */
const { total, setTotal, pageInfo, handleSizeChange, handleCurrentChange } =
  usePagination(loadData);

onMounted(() => {
  loadData();
});
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  .round {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(235, 236, 245);
    text-align: center;
    line-height: 30px;
  }
  h4 {
    color: #666;
  }
}
.total {
  display: flex;
  align-items: center;
  h1 {
    font-size: 30px;
    margin-right: 20px;
  }
  .percent {
    display: inline-block;
    padding: 3px 5px;
    height: 20px;
    background-color: rgb(235, 247, 239);
    font-size: 12px;
    line-height: 20px;
    border-radius: 2px;
  }
}
.chart {
  width: 100%;
  height: 300px;
}
.search-input {
  max-width: 400px;
}
</style>
