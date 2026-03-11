import type { ECharts, EChartsCoreOption } from 'echarts';
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export default function useChart(
  chartRef: Ref<HTMLElement | null>,
  getChartOption: () => Promise<EChartsCoreOption | undefined>
) {
  const myChart = ref<ECharts | null>(null);

  const initChart = async () => {
    if (chartRef.value) {
      const chartOption = await getChartOption();
      if (chartOption) {
        console.log(chartOption);
        myChart.value = echarts.init(chartRef.value);
        myChart.value.setOption(chartOption);
      }
    }
  };

  const resizeChart = () => {
    myChart.value?.resize();
  };

  onMounted(() => {
    initChart();
    window.addEventListener('resize', resizeChart);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
    if (myChart.value) {
      myChart.value.dispose();
    }
  });
}
