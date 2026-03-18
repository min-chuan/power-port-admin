<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="searchParams.no" placeholder="请输入会员卡号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchParams.tel" placeholder="请输入手机号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchParams.name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table ref="tableRef" v-loading="loading" :data="dataList">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="会员卡号" prop="memberCardNumber"></el-table-column>
      <el-table-column label="卡类型" prop="cardType"></el-table-column>
      <el-table-column label="开卡日期" prop="issueDate"></el-table-column>
      <el-table-column label="持有人姓名" prop="holderName"></el-table-column>
      <el-table-column label="持有人电话" prop="holderPhone"></el-table-column>
      <el-table-column label="卡余额" prop="cardBalance"></el-table-column>
      <el-table-column label="消费记录" prop="transactionRecords">
        <template #default="{ row: { transactionRecords } }">
          <el-popover title="消费记录" trigger="click" placement="top-start" :width="200">
            <template #reference>
              <el-button size="small">日消费</el-button>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in transactionRecords as MemberItem['transactionRecords']"
                :key="index"
                style="max-width: 600px"
                :timestamp="activity.transactionDate"
                hollow
                type="primary"
              >
                <p>消费金额：{{ activity.transactionAmount }}</p>
                <p>消费类型：{{ activity.transactionType }}</p>
              </el-timeline-item>
            </el-timeline>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="有效日期" prop="validUntil"></el-table-column>
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
import { useHttp } from '@/hooks/useHttp';
import type { MemberItem } from '@/types/equipment';
interface SearchType {
  no: string;
  tel: string;
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
} = useHttp<MemberItem, SearchType>('/member', { no: '', tel: '', name: '' });
</script>
<style lang="less" scoped>
.el-timeline.is-start {
  padding-left: 0;
}
</style>
