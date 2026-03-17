<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <div class="title mb">
          <h3 class="mr">今日设备运行状态</h3>
          <p>更新时间：2024年8月31日</p>
          <el-icon color="#86909c"><Refresh /></el-icon>
        </div>
        <div class="equipment">
          <div class="item">
            <h4 class="mt mb">充电桩使用率</h4>
            <img class="mt mb" :src="flash" alt="" />
            <h1 class="mb">2263 / 3398</h1>
            <div class="statistic-card">
              <el-statistic :value="9">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" content="有9台设备异常，请尽快处理" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span>
                    24%
                    <el-icon color="green">
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mt mb">充电柜使用率</h4>
            <img class="mt mb" :src="flash2" alt="" />
            <h1 class="mb">655 / 1233</h1>
            <div class="statistic-card">
              <el-statistic :value="22">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" content="有22台设备异常，请尽快处理" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span>
                    24%
                    <el-icon color="red">
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mt mb">充电站使用率</h4>
            <img class="mt mb" :src="flash3" alt="" />
            <h1 class="mb">72 / 95</h1>
            <div class="statistic-card">
              <el-statistic :value="47">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" content="有47台设备异常，请尽快处理" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span>
                    24%
                    <el-icon color="green">
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>常用功能</h3>
          </div>
        </template>
        <div class="quick mt mb">
          <el-row>
            <el-col :span="4">
              <img :src="repair" alt="" />
              <p>设备维修</p>
            </el-col>
            <el-col :span="4">
              <img :src="progress" alt="" />
              <p>每日日报</p>
            </el-col>
            <el-col :span="4">
              <img :src="remain" alt="" />
              <p>任务进度</p>
            </el-col>
            <el-col :span="4">
              <img :src="total" alt="" />
              <p>营收占比</p>
            </el-col>
            <el-col :span="4">
              <img :src="money" alt="" />
              <p>营收统计</p>
            </el-col>
            <el-col :span="4">
              <img :src="daily" alt="" />
              <p>代办事项</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>能源统计</h3>
          </div>
        </template>
        <el-row>
          <el-col :span="6">
            <div ref="chart1" class="chart"></div>
          </el-col>
          <el-col :span="18">
            <div ref="chart2" class="chart"></div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="card-header">
            <h3>设备总览</h3>
          </div>
        </template>
        <div ref="chart3" class="right-chart"></div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>营收统计表</h3>
          </div>
        </template>
        <ul class="ranking-list">
          <li class="ranking-item">
            <span class="rank first">1</span>
            <span class="store-name">广州</span>
            <span class="sales">52,457</span>
            <span>
              24%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank second">2</span>
            <span class="store-name">上海</span>
            <span class="sales">323,234</span>
            <span>
              24%
              <el-icon color="red">
                <CaretBottom />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank third">3</span>
            <span class="store-name">佛山</span>
            <span class="sales">192,255</span>
            <span>
              24%
              <el-icon color="red">
                <CaretBottom />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">4</span>
            <span class="store-name">珠海</span>
            <span class="sales">17,540</span>
            <span>
              24%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">5</span>
            <span class="store-name">深圳</span>
            <span class="sales">662,337</span>
            <span>
              24%
              <el-icon color="red">
                <CaretBottom />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">6</span>
            <span class="store-name">厦门</span>
            <span class="sales">22,941</span>
            <span>
              24%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">7</span>
            <span class="store-name">长沙</span>
            <span class="sales">565,221</span>
            <span>
              24%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
        </ul>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h3>故障报警</h3>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item timestamp="2024/4/12" placement="top" type="danger" hollow>
            <el-card>
              <h4>矿业北路通信中断</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2024/4/3" placement="top" type="warning" hollow>
            <el-card>
              <h4>黄河南路超出服务区</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2024/4/2" placement="top" type="danger" hollow>
            <el-card>
              <h4>6号机组异常断电</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { getChartData, getChartData2, getChartData3 } from '@/api/dashboard';
import daily from '@/assets/daily.png';
import flash from '@/assets/flash.png';
import flash2 from '@/assets/flash2.png';
import flash3 from '@/assets/flash3.png';
import money from '@/assets/money.png';
import progress from '@/assets/progress.png';
import remain from '@/assets/remain.png';
import repair from '@/assets/repair.png';
import total from '@/assets/total.png';
import useChart from '@/hooks/useChart';
import type { EChartsCoreOption } from 'echarts';
import { reactive, useTemplateRef } from 'vue';

const chartRef1 = useTemplateRef('chart1');
const getChartOption1 = async () => {
  const chartOption = reactive<EChartsCoreOption>({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 'bottom',
    },
    series: [
      {
        name: '营收占比',
        type: 'pie',
        radius: ['50%', '70%'],
        roseType: 'area',
        label: {
          show: false,
          position: 'center',
        },

        data: [],
      },
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: '营收占比',
        fontSize: 20,
        fill: '#333',
      },
    },
  });
  try {
    const res = await getChartData();
    if (res.data) {
      (chartOption.series as any)[0].data = res.data;
      return chartOption;
    }
  } catch (err) {
    console.log('error', err);
  }
};
useChart(chartRef1, getChartOption1);

const chartRef2 = useTemplateRef('chart2');
const getChartOption2 = async () => {
  const chartOption = reactive<EChartsCoreOption>({
    title: {
      text: '电量统计',
      left: 'left',
      top: 'top',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
      top: 'top',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}kw',
      },
    },
    series: [
      {
        name: '',
        type: 'line',
        smooth: true,
        data: [],
        lineStyle: {
          width: 4,
        },
        itemStyle: {
          color: 'purple',
          shadowBlur: 10,
          shadowColor: 'rgba(0,255,0,0.5)',
        },
      },
      {
        name: '',
        type: 'line',
        smooth: true,
        data: [],
        lineStyle: {
          width: 4,
        },
        itemStyle: {
          color: 'lightgreen',
          shadowBlur: 10,
          shadowColor: 'rgba(0,255,0,0.5)',
        },
      },
      {
        name: '',
        type: 'line',
        smooth: true,
        data: [],
        lineStyle: {
          width: 4,
        },
        itemStyle: {
          color: 'skyblue',
          shadowBlur: 10,
          shadowColor: 'rgba(0,255,0,0.5)',
        },
      },
    ],
  });
  try {
    const res = await getChartData2();
    if (res.data) {
      res.data.forEach((item, index) => {
        (chartOption.legend as any).data.push(item.name);
        (chartOption.series as any)[index].name = item.name;
        (chartOption.series as any)[index].data = item.data;
      });
      return chartOption;
    }
  } catch (err) {
    console.log('error', err);
  }
};
useChart(chartRef2, getChartOption2);

const chartRef3 = useTemplateRef('chart3');
const getChartOption3 = async () => {
  const chartOption = reactive<EChartsCoreOption>({
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '闲置数', max: 65 },
        { name: '使用数', max: 160 },
        { name: '故障数', max: 300 },
        { name: '维修数', max: 380 },
        { name: '更换数', max: 520 },
        { name: '报废数', max: 250 },
      ],
    },
    series: [
      {
        name: '设备总览',
        type: 'radar',
        data: [
          {
            value: [],
            name: '设备总览',
          },
        ],
      },
    ],
  });
  try {
    const res = await getChartData3();
    if (res.data) {
      (chartOption.series as any)[0].data[0].value = res.data.list;
      return chartOption;
    }
  } catch (err) {
    console.log('error', err);
  }
};
useChart(chartRef3, getChartOption3);
</script>
<style lang="less" scoped>
.title {
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  font-weight: bold;
  p {
    margin-right: 5px;
    color: #86909c;
  }
}
.equipment {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  .item {
    h1 {
      font-size: 36px;
    }
  }
}
.quick {
  text-align: center;
  p {
    margin-top: 10px;
    color: #333;
  }
}
.chart {
  width: 100%;
  height: 400px;
}
.right-chart {
  width: 100%;
  height: 300px;
}
.ranking-list {
  .ranking-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &:nth-child(even) {
      background-color: rgb(253, 246, 236);
    }
    .rank {
      display: inline-block;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      color: #666;
      text-align: center;
      &.first {
        background-color: rgb(103, 194, 58);
        color: #fff;
      }
      &.second {
        background-color: rgb(58, 153, 194);
        color: #fff;
      }
      &.third {
        background-color: rgb(194, 156, 58);
        color: #fff;
      }
    }
    .store-name {
      flex-grow: 1;
      padding: 0 10px;
    }
    .sales {
      color: #666;
      margin-right: 50px;
    }
  }
}
</style>
