<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <el-descriptions direction="vertical" border>
          <el-descriptions-item :rowspan="2" :width="140" label="个人头像" align="center">
            <el-image
              style="width: 100px; height: 100px"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </el-descriptions-item>
          <el-descriptions-item label="姓名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="电话">18100000000</el-descriptions-item>
          <el-descriptions-item label="地址">Suzhou</el-descriptions-item>
          <el-descriptions-item label="个人标签">
            <el-tag size="small" type="primary" class="mr">认真</el-tag>
            <el-tag size="small" type="success" class="mr">工作狂</el-tag>
            <el-tag size="small" type="info" class="mr">与人和善</el-tag>
            <el-tag size="small" type="danger">洁癖</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="mt">
        <el-calendar v-model="value" />
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>完善个人资料</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="16">
            <StepForm :steps="steps" :on-submit="handleSubmit">
              <template #step1>
                <el-form ref="form1" :model="form.basicInfo">
                  <el-form-item label="姓名">
                    <el-input v-model="form.basicInfo.name"></el-input>
                  </el-form-item>
                  <el-form-item label="电话">
                    <el-input v-model="form.basicInfo.tel"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.basicInfo.address"></el-input>
                  </el-form-item>
                </el-form>
              </template>
              <template #step2>
                <el-form ref="form2" :model="form.job">
                  <el-form-item label="在职信息">
                    <el-select v-model="form.job.status" placeholder="请选择在职状态">
                      <el-option label="工作中" value="1"></el-option>
                      <el-option label="请假中" value="2"></el-option>
                      <el-option label="出差中" value="3"></el-option>
                      <el-option label="年假中" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </template>
            </StepForm>
          </el-col>
          <el-col :span="8">
            <div class="progress center-both">
              <h2>资料完善度</h2>
              <el-progress type="circle" :percentage="85" />
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <div>
          <el-badge :value="12" class="mr">
            <el-button>待办事项</el-button>
          </el-badge>
          <el-badge :value="3" class="mr">
            <el-button>指派给我</el-button>
          </el-badge>
          <el-badge :value="12" class="mr">
            <el-button>部门公告</el-button>
          </el-badge>
          <el-badge :value="2" class="mr">
            <el-button>站内信</el-button>
          </el-badge>
          <el-badge :value="1" class="mr" type="primary">
            <el-button>我指派的</el-button>
          </el-badge>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="账号注销通知！" name="1">
            <div class="message mt">
              <h3>员工离职，账号需要注销，请及时处理！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="权限变更通知！" name="2">
            <div class="message mt">
              <h3>王丽丽因部门调动账号权限需调整！</h3>
              <el-button v-permission="'user'" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="财务放款通知！" name="3">
            <div class="message mt">
              <h3>北京充电站充电桩维修放款！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="人员调动通知！" name="4">
            <div class="message mt">
              <h3>李继维由行政部转为维修部，需要办理！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="出差费用报销审批" name="5">
            <div class="message mt">
              <h3>运营部7人出差，报销费用8700元需审批</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="财务放款通知！" name="6">
            <div class="message mt">
              <h3>北京充电站充电桩维修放款！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="人员调动通知！" name="7">
            <div class="message mt">
              <h3>李继维由行政部转为维修部，需要办理！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="出差费用报销审批" name="8">
            <div class="message mt">
              <h3>运营部7人出差，报销费用8700元需审批</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="账号注销通知！" name="9">
            <div class="message mt">
              <h3>员工离职，账号需要注销，请及时处理</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="权限变更通知！" name="10">
            <div class="message mt">
              <h3>王丽丽因部门调动账号权限需调整！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="财务放款通知！" name="11">
            <div class="message mt">
              <h3>北京充电站充电桩维修放款！</h3>
              <el-button v-permission="['admin']" type="primary" size="small" class="mr">
                去处理
              </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import StepForm from '@/components/stepForm/StepForm.vue';
import { ref } from 'vue';

const value = ref(new Date());

/* 分步表单 */
const steps = [{ title: '基本信息' }, { title: '在职信息' }];
const handleSubmit = () => {
  // console.log('xxx', form.value);
};

/* 基本信息表单 */
const form = ref({
  basicInfo: { name: '', tel: '', address: '' },
  job: {
    status: '',
  },
});

/* 列表 */
const activeNames = ref(['1']);
</script>

<style lang="less" scoped>
.progress {
  flex-direction: column;
  h2 {
    margin-top: 20px;
    margin-bottom: 40px;
  }
}
.message {
  display: flex;
  justify-content: space-between;
}
</style>
