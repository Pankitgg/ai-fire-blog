<!--
 * @Author: AI Assistant
 * @Date: 2023-07-01
 * @Description: AI对话页面
-->
<template>
  <div class="aichat-page">
    <div class="page-header">
      <h1>AI 智能助手</h1>
      <p>您的全能AI伙伴，随时为您解答疑惑</p>
    </div>
    <div class="chat-section">
      <ChatOnce />
    </div>
  </div>
</template>

<script lang="ts" setup>
// 导入AI对话组件
import ChatOnce from './ai/chatOnce.vue'
</script>

<style lang="less" scoped>
.aichat-page {
  min-height: calc(100vh - 60px);
  padding: 40px 20px;
  background: var(--bg-secondary);
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  color: var(--text-main);
  
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 12px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: 18px;
    color: var(--text-secondary);
  }
}

.chat-section {
  max-width: 1000px;
  margin: 0 auto;
  height: 600px;
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
}

// 响应式设计
@media (max-width: 768px) {
  .aichat-page {
    padding: 20px 10px;
  }
  
  .page-header {
    margin-bottom: 24px;
    
    h1 {
      font-size: 28px;
    }
    
    p {
      font-size: 16px;
    }
  }
  
  .chat-section {
    height: 70vh;
    border-radius: var(--radius-lg);
  }
}
</style>