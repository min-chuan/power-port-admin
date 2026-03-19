<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <!-- 错误代码 -->
      <div class="error-code">404</div>

      <!-- 错误标题 -->
      <h1 class="error-title">页面未找到</h1>

      <!-- 错误描述 -->
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移除。
        <br />
        请检查URL是否正确，或返回首页继续浏览。
      </p>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" size="large" @click="goHome">
          <el-icon><HomeFilled /></el-icon>
          返回首页
        </el-button>
        <el-button type="default" size="large" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回上一页
        </el-button>
      </div>

      <!-- 额外提示 -->
      <div class="extra-tips">
        <p>如果您认为这是一个错误，请联系系统管理员。</p>
      </div>

      <!-- 装饰性元素 -->
      <div class="decoration">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, HomeFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回首页
const goHome = () => {
  router.push('/');
};

// 返回上一页
const goBack = () => {
  router.back();
};
</script>

<style scoped lang="less">
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.not-found-content {
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: #409eff;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 3px 3px 0 rgba(64, 158, 255, 0.1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.error-description {
  font-size: 16px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 40px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;

  .el-button {
    padding: 12px 32px;
    font-size: 16px;
    border-radius: 8px;

    .el-icon {
      margin-right: 8px;
    }
  }
}

.extra-tips {
  color: #909399;
  font-size: 14px;
  line-height: 1.5;

  p {
    margin: 8px 0;
  }
}

.decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);

  &.circle-1 {
    width: 100px;
    height: 100px;
    top: -50px;
    right: -50px;
  }

  &.circle-2 {
    width: 150px;
    height: 150px;
    bottom: -75px;
    left: -75px;
  }

  &.circle-3 {
    width: 80px;
    height: 80px;
    top: 50%;
    left: 10%;
  }
}

.not-found-content > * {
  position: relative;
  z-index: 1;
}

// 响应式设计
@media (max-width: 768px) {
  .not-found-content {
    padding: 40px 20px;
  }

  .error-code {
    font-size: 80px;
  }

  .error-title {
    font-size: 24px;
  }

  .error-description {
    font-size: 14px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;

    .el-button {
      width: 100%;
      max-width: 300px;
    }
  }

  .circle-1,
  .circle-2,
  .circle-3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 60px;
  }

  .error-title {
    font-size: 20px;
  }

  .action-buttons .el-button {
    padding: 10px 24px;
    font-size: 14px;
  }
}
</style>
