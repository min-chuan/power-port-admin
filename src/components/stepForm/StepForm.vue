<template>
  <div class="step-form">
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step v-for="step in steps" :key="step.title" :title="step.title" />
    </el-steps>
    <template v-for="num in steps.length" :key="num">
      <div v-if="currentStep === num - 1" class="mt">
        <slot :name="`step${num}`"></slot>
      </div>
    </template>
    <div>
      <el-button v-if="currentStep !== 0" @click="handlePrev">上一步</el-button>
      <el-button v-if="currentStep !== steps.length - 1" type="primary" @click="handleNext">
        下一步
      </el-button>
      <el-button v-if="currentStep === steps.length - 1" type="primary" @click="handleSubmit">
        提交
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';

interface Props {
  steps: { title: string }[];
  // eslint-disable-next-line
  onBeforeNext?: (currentStep: number) => Promise<boolean | undefined>;
  // eslint-disable-next-line
  onSubmit: (currentStep: number) => void;
}
const props = withDefaults(defineProps<Props>(), {
  onBeforeNext: async () => true,
});
const { steps } = toRefs(props);

const currentStep = ref(0);
const handlePrev = () => {
  currentStep.value--;
};
const handleNext = async () => {
  try {
    const result = await props.onBeforeNext(currentStep.value);
    if (result !== false) {
      currentStep.value++;
    }
  } catch (err) {
    console.log('error', err);
  }
};
const handleSubmit = () => {
  props.onSubmit(currentStep.value);
};

/* ref 暴露 */
const reset = () => {
  currentStep.value = 0;
};
defineExpose({ reset });
</script>
<style lang="less">
.step-form {
  max-width: 600px;
}
</style>
