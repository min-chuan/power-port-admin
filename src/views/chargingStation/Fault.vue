<template>
  <el-card>
    <el-select
      :model-value="value"
      filterable
      placeholder="选择站点名称"
      style="width: 300px"
      @change="handleSelectChange"
    >
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </el-card>
  <el-card class="mt">
    <el-radio-group v-model="status" size="large" fill="#409eff" @change="handleStatusChange">
      <el-radio-button :label="`全部(${allCount})`" :value="0" />
      <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1" />
      <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2" />
      <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3" />
      <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4" />
      <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5" />
      <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6" />
    </el-radio-group>
  </el-card>
  <el-card class="mt">
    <el-row :gutter="20">
      <el-col v-for="item in currentList" :key="item.id" :span="6">
        <div class="item center-both">
          <div class="pic">
            <p>{{ statusMap[item.status] }}</p>
            <img :src="imgMap[item.status]" alt="" />
            <p v-if="item.status === 2">{{ item.percent }}</p>
            <p v-else>0%</p>
          </div>
          <div class="info">
            <h3>{{ item.id }}</h3>
            <hr class="mb" />
            <p>电压：{{ item.voltage }}</p>
            <p>电流：{{ item.current }}</p>
            <p>功率：{{ item.power }}</p>
            <p>温度：{{ item.tem }}</p>
          </div>
        </div>
        <div class="btn">
          <div class="divider"></div>
          <div class="clear">
            <p class="fl ml">暂无预警</p>
            <div class="fr mr tar">
              <el-button size="small">维保记录</el-button>
              <el-popover placement="right" :width="280" trigger="click">
                <template #reference>
                  <el-button size="small" type="primary">使用记录</el-button>
                </template>
                <h3 class="mb">使用记录</h3>
                <el-timeline>
                  <el-timeline-item
                    v-for="record in item.record"
                    :key="record.time"
                    :timestamp="record.time"
                    :hollow="true"
                  >
                    {{ record.msg }}
                  </el-timeline-item>
                </el-timeline>
              </el-popover>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup lang="ts">
import { currentListApi } from '@/api/chargingstation';
import free from '@/assets/free.png';
import ing from '@/assets/ing.png';
import outline from '@/assets/outline.png';
import type { CurrentItem } from '@/types/station';
import { computed, onMounted, ref } from 'vue';

/* 查询框功能 */
const loading = ref(false);
const value = ref<string>('');
const options = ref<CurrentItem[]>([]);
const handleSelectChange = (id: string) => {
  value.value = id;
  const list = options.value.find((item) => item.id === id)!.list;
  status.value = 0;
  dataList.value = list;
  currentList.value = list;
};

/* 单选功能 */
const status = ref(0);
const checkCount = (status: number) => {
  return dataList.value.filter((item) => item.status === status).length;
};
const allCount = computed(() => {
  return dataList.value.length;
});
const handleStatusChange = () => {
  if (status.value === 0) {
    currentList.value = dataList.value;
  } else {
    currentList.value = dataList.value.filter((item) => item.status === status.value);
  }
};

/* 列表功能 */
const dataList = ref<CurrentItem['list']>([]);
const currentList = ref<CurrentItem['list']>([]);
const loadData = async () => {
  try {
    loading.value = true;
    const res = await currentListApi();
    if (res.data && res.data.length) {
      options.value = res.data;
      value.value = res.data[0]!.id;
      dataList.value = res.data[0]!.list;
      currentList.value = res.data[0]!.list;
    }
  } catch (err) {
    console.log('error', err);
  } finally {
    loading.value = false;
  }
};
const statusMap = ['全部', '空闲中', '充电中', '连接中', '排队中', '已预约', '故障/离线'];
const imgMap = ['', free, ing, ing, ing, ing, outline];

onMounted(() => {
  loadData();
});
</script>
<style lang="less" scoped>
.item {
  height: 200px;
  background-color: rgb(247, 251, 254);
  padding: 20px;
  border-radius: 10px 10px 0 0;
  margin-top: 20px;
  .pic {
    p {
      width: 76px;
      text-align: center;
      margin-bottom: 10px;
      color: rgb(61, 187, 146);
    }
  }
  .info {
    color: #999;
    margin-left: 30px;
    line-height: 26px;
    margin-top: -10px;
  }
}
.btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #f7fbfe;
  .divider {
    background-color: #f4f4f4;
    height: 2px;
    width: 95%;
    margin: auto;
  }
  p {
    font-size: 12px;
    color: #999;
  }
}
</style>
