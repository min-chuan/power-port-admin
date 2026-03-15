<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import { mapListApi } from '@/api/map';
import flashIcon from '@/assets/flashIcon.png';
import station from '@/assets/station.jpg';
import type { StationPoint } from '@/types/map';
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, onUnmounted, ref } from 'vue';
/* 地图功能 */
let map: any = null;
onMounted(async () => {
  (window as any)._AMapSecurityConfig = {
    securityJsCode: '4e9807b38756aa5a2cba8d0fbc7a2fbd',
  };
  try {
    const AMap = await AMapLoader.load({
      key: '24cb67d4583088939fa4db95a2b0184c', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    });
    map = new AMap.Map('container', {
      // 设置地图容器id
      viewMode: '3D', // 是否为3D地图模式
      zoom: 5, // 初始化地图级别
      center: [116.397428, 39.90923], // 初始化地图中心点位置
    });
    await loadData();
    markData.value.forEach((item) => addMarker(AMap, item));
  } catch (err) {
    console.log('error', err);
  }
});
onUnmounted(() => {
  map?.destroy();
});
const loadData = async () => {
  try {
    const res = await mapListApi();
    if (res.data) {
      markData.value = res.data;
    }
  } catch (err) {
    console.log('error', err);
  }
};

/* 地图标记 */
const markData = ref<StationPoint[]>([]);
const addMarker = (AMap: any, point: StationPoint) => {
  const marker = new AMap.Marker({
    position: point.position,
    icon: flashIcon, //添加 icon 图标 URL
    title: point.title,
  });
  addInfoWindow(AMap, marker, point);
  map.add(marker);
};
const addInfoWindow = (AMap: any, marker: any, point: StationPoint) => {
  const infoWindow = new AMap.InfoWindow({
    offset: new AMap.Pixel(0, -30),
  });
  infoWindow.setContent(`
    <div class="info">
      <div>
        <img src=${station} width="200px"/>
      </div>
      <div class="right">
        <h3>${point.title}</h3>
        <p>充电桩数量：${point.count}</p>
        <p>充电站状态：<span class="tag">${point.status === 1 ? '使用中' : '维护中'}</span></p>
      </div>
    </div>
  `);
  marker.on('click', () => {
    infoWindow.open(map, marker.getPosition());
  });
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 80vh;
  :deep(.info) {
    display: flex;
    padding: 10px;
    align-items: center;
    .right {
      width: 180px;
      line-height: 30px;
      margin-left: 20px;
      .tag {
        color: blue;
      }
    }
  }
}
</style>
