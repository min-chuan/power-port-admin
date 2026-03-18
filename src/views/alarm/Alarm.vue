<template>
  <el-card>
    <el-radio-group v-model="radio1" size="large" fill="#409eff">
      <el-radio-button label="严重告警" :value="1" />
      <el-radio-button label="紧急告警" :value="2" />
      <el-radio-button label="重要告警" :value="3" />
      <el-radio-button label="一般告警" :value="4" />
    </el-radio-group>
  </el-card>
  <el-card v-for="item in alarmList" :key="item.equNo" class="mt">
    <el-alert
      style="width: 100%"
      :title="`${item.address}充电站充电异常`"
      type="warning"
      show-icon
      :closable="false"
    />
    <el-descriptions :column="4" direction="vertical" :border="true" class="mt">
      <el-descriptions-item label="故障表述">{{ item.description }}</el-descriptions-item>
      <el-descriptions-item label="设备地址">{{ item.address }}</el-descriptions-item>
      <el-descriptions-item label="设备号">{{ item.equNo }}</el-descriptions-item>
      <el-descriptions-item label="告警级别">
        <el-tag :type="levelMap[item.level]?.type">{{ levelMap[item.level]?.label }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="故障时间">{{ item.time }}</el-descriptions-item>
      <el-descriptions-item label="故障代码">{{ item.code }}</el-descriptions-item>
      <el-descriptions-item label="当前状态">
        <el-text type="danger">{{ statusMap1[item.status] }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button :type="statusMap2[item.status]?.type" @click="handleOpen(item)">
          {{ statusMap2[item.status]?.label }}
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-drawer v-model="drawer" title="报警任务指派" direction="rtl">
    <StepForm
      ref="stepFormRef"
      :steps="steps"
      :on-before-next="handleBeforeNext"
      :on-submit="handleSubmit"
    >
      <template #step1>
        <el-form ref="formRef1" :model="form.basicInfo" :rules="basicRules">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="form.basicInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="form.basicInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="电话:" prop="tel">
            <el-input v-model="form.basicInfo.tel"></el-input>
          </el-form-item>
          <el-form-item label="工号:" prop="no">
            <el-input v-model="form.basicInfo.no"></el-input>
          </el-form-item>
          <el-form-item label="是否加急:">
            <el-switch v-model="form.basicInfo.urgent"></el-switch>
          </el-form-item>
          <el-form-item label="其他选项:">
            <el-checkbox-group v-model="form.basicInfo.other">
              <el-checkbox value="1">更换设备</el-checkbox>
              <el-checkbox value="2">仅维修</el-checkbox>
              <el-checkbox value="3">需拍照片</el-checkbox>
              <el-checkbox value="4">需报备</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其他备注信息:">
            <el-input v-model="form.basicInfo.remarks" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #step2>
        <el-form ref="formRef2" :model="form.approvalInfo" :rules="approvalRules">
          <el-form-item label="审批部门:" prop="approveDep">
            <el-select v-model="form.approvalInfo.approveDep" placeholder="请选择审批部门">
              <el-option label="总裁办" value="1"></el-option>
              <el-option label="运营部" value="2"></el-option>
              <el-option label="维修部" value="3"></el-option>
              <el-option label="市场部" value="4"></el-option>
              <el-option label="财务部" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送部门:" prop="copyDep">
            <el-select v-model="form.approvalInfo.copyDep" placeholder="请选择抄送部门">
              <el-option label="总裁办" value="1"></el-option>
              <el-option label="运营部" value="2"></el-option>
              <el-option label="维修部" value="3"></el-option>
              <el-option label="市场部" value="4"></el-option>
              <el-option label="财务部" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #step3>
        <el-form ref="formRef3" :model="form.directorInfo" :rules="directorRules">
          <el-form-item label="负责人姓名:" prop="name">
            <el-input v-model="form.directorInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话:" prop="tel">
            <el-input v-model="form.directorInfo.tel"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </StepForm>
    <el-result
      icon="warning"
      :title="`设备编号${alarm?.equNo}`"
      sub-title="该任务已催促两次，请抓紧处理"
    >
      <template #extra>
        <el-button type="primary">我已知晓</el-button>
      </template>
    </el-result>
  </el-drawer>
</template>
<script lang="ts" setup>
import { alarmListApi } from '@/api/alarm';
import StepForm from '@/components/stepForm/StepForm.vue';
import type { AlarmItem } from '@/types/alarm';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { onMounted, reactive, ref, useTemplateRef } from 'vue';
/* 单选按钮组 */
const radio1 = ref(1);

/* 列表 */
const alarmList = ref<AlarmItem[]>([]);
const levelMap = [
  { label: '', type: '' },
  { label: '严重', type: 'danger' },
  { label: '紧急', type: 'warning' },
  { label: '一般', type: 'info' },
];
const statusMap1 = ['', '待指派', '处理中', '处理异常'];
const statusMap2 = [
  { label: '', type: '' },
  { label: '指派', type: 'primary' },
  { label: '催办', type: 'warning' },
  { label: '查看', type: 'primary' },
];
const loadData = async () => {
  try {
    const res = await alarmListApi();
    if (res.data) {
      alarmList.value = res.data;
    }
  } catch (err) {
    console.log('error', err);
  }
};
onMounted(() => {
  loadData();
});

/* 抽屉组件 */
const alarm = ref<AlarmItem | null>(null);
const drawer = ref(false);
const handleOpen = (val: AlarmItem) => {
  alarm.value = val;
  if (stepFormRef.value) {
    stepFormRef.value.reset();
  }
  resetForm();
  drawer.value = true;
};
const handleClose = () => {
  drawer.value = false;
};

/* 分布表单组件 */
const steps = [{ title: '基本信息' }, { title: '审批信息' }, { title: '负责人信息' }];
const stepFormRef = useTemplateRef('stepFormRef');
const handleBeforeNext = async (step: number) => {
  return await validate(step);
};
const handleSubmit = async (step: number) => {
  const result = await validate(step);
  if (result) {
    // 提交表单
    ElMessage.success('提交成功');
    handleClose();
    loadData();
  }
};

/* 表单 */
const form = ref({
  basicInfo: {
    name: '',
    email: '',
    tel: '',
    no: '',
    urgent: true,
    other: [],
    remarks: '',
  },
  approvalInfo: {
    approveDep: '',
    copyDep: '',
  },
  directorInfo: {
    name: '',
    tel: '',
  },
});
const resetForm = () => {
  form.value = {
    basicInfo: {
      name: '',
      email: '',
      tel: '',
      no: '',
      urgent: true,
      other: [],
      remarks: '',
    },
    approvalInfo: {
      approveDep: '',
      copyDep: '',
    },
    directorInfo: {
      name: '',
      tel: '',
    },
  };
};
const validate = async (step: number) => {
  const refMap = [formRef1.value, formRef2.value, formRef3.value];
  const refForm = refMap[step];
  let result = false;
  if (refForm) {
    await refForm.validate((isValid) => {
      if (isValid) {
        result = true;
      }
    });
  }
  return Promise.resolve(result);
};

/* 表单1 */
const formRef1 = useTemplateRef<FormInstance>('formRef1');
const basicRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  no: [{ required: true, message: '请输入工号', trigger: 'blur' }],
});

/* 表单2 */
const formRef2 = useTemplateRef<FormInstance>('formRef2');
const approvalRules = reactive<FormRules>({
  approveDep: [{ required: true, message: '请选择审批部门', trigger: 'blur' }],
  copyDep: [{ required: true, message: '请选择抄送部门', trigger: 'blur' }],
});

/* 表单3 */
const formRef3 = useTemplateRef<FormInstance>('formRef3');
const directorRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
});
</script>
