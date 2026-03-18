<template>
  <div>
    <span class="title">文章类型:</span>
    <el-tag
      :type="'全部' === modelValue ? 'primary' : 'info'"
      class="ml tag"
      @click="handleClick('全部')"
      >全部</el-tag
    >
    <el-tag
      v-for="item in tagList"
      :key="item"
      :type="item === modelValue ? 'primary' : 'info'"
      class="ml"
      @click="handleClick(item)"
    >
      {{ item }}
    </el-tag>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  modelValue?: string;
  tagList: string[];
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '全部',
});
const emit = defineEmits(['update:modelValue']);
const { tagList, modelValue } = toRefs(props);

const handleClick = (val: string) => {
  emit('update:modelValue', val);
};
</script>
<style lang="less" scoped>
.title {
  display: inline-block;
  width: 60px;
  font-size: 14px;
}
.el-tag {
  cursor: pointer;
}
</style>
