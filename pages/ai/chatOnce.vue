<!--
 * @Author: AI Assistant
 * @Date: 2023-07-01
 * @Description: 单次对话组件 - 支持对话和回答两种模式
-->
<template>
  <div class="ai-chat-once-container">
    <!-- 第一次握手对话框 -->
    <div v-if="showHandshakeDialog" class="handshake-dialog-overlay">
      <div class="handshake-dialog">
        <h3>请输入作者名称</h3>
        <p class="dialog-description">请输入作者名字的全英文小写</p>
        
        <div class="input-wrapper">
          <input
            v-model="authorName"
            type="text"
            placeholder="作者名称（全英文小写）"
            @keyup.enter="validateAndSubmit"
          />
          <p v-if="authorNameError" class="error-message">{{ authorNameError }}</p>
        </div>
        
        <div class="dialog-actions">
          <button @click="showHandshakeDialog = false" class="cancel-button">取消</button>
          <button @click="validateAndSubmit" class="confirm-button">确定</button>
        </div>
      </div>
    </div>
    <!-- 对话模式 -->
    <div v-if="mode === 'chat'" class="mode-container">
      <div class="input-section">
        <textarea
          v-model="userInput"
          @keyup.enter.ctrl="handleSend"
          @keyup.enter.meta="handleSend"
          placeholder="请输入您的问题..."
          maxlength="1000"
          rows="4"
        ></textarea>
        <div class="char-count">{{ userInput.length }}/1000</div>
        <!-- 快捷问题按钮 -->
        <div class="quick-questions">
          <button @click="handleFirstHandshake" class="quick-question-button first-handshake-button">
            第一次握手
          </button>
          <button 
            v-for="(button, index) in quickButtons"
            :key="index"
            class="quick-question-button"
            @click="fillQuestion(button.message)"
          >
            {{ button.buttonname }}
          </button>
        </div>
      </div>
      
      <button 
        class="action-button send-button"
        @click="handleSend"
        :disabled="!userInput.trim()"
      >
        <i class="iconfont icon-send"></i>
      </button>
    </div>
    <!-- 回答模式 -->
    <div v-else-if="mode === 'answer'" class="mode-container">
      
      <div class="answer-section">
        <!-- 用户问题 -->
        <div class="user-question">
          <div class="question-label">您的问题：</div>
          <div class="question-content">{{ userInput }}</div>
        </div>
        
        <!-- AI回答 -->
        <div class="ai-answer">
          <div class="answer-label">AI回答：</div>
          <div class="answer-content">
            <div v-if="isStreaming" class="streaming-content">
              {{ streamingContent }}
              <span class="cursor">|</span>
            </div>
            <div v-else class="completed-content">
              {{ aiAnswer }}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        class="action-button back-button"
        @click="resetChat"
      >
        <i class="iconfont icon-back"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/utils/request'
import { quickButtons } from './init'

// 定义模式类型
type Mode = 'chat' | 'answer'

// 响应式数据
const mode = ref<Mode>('chat')
const userInput = ref('')
const aiAnswer = ref('')
const streamingContent = ref('')
const isStreaming = ref(false)

// 发送问题
const handleSend = async () => {
  const input = userInput.value.trim()
  if (!input) return
  
  // 切换到回答模式
  mode.value = 'answer'
  isStreaming.value = true
  streamingContent.value = ''
  aiAnswer.value = ''
  
  try {
    // 调用AI接口获取流式回答
    await getStreamingAnswer(input)
  } catch (error: any) {
    console.error('AI接口调用失败:', error)
    if(error.message!=undefined){
      aiAnswer.value = error.message
    }else{
      aiAnswer.value = '抱歉，我现在暂时无法为您提供回答，请稍后再试。'
    }
  } finally {
    isStreaming.value = false
  }
}

// 模拟流式回答（实际项目中可替换为真实的流式API）
const getStreamingAnswer = async (question: string) => {
  // 首先尝试调用API获取完整回答
  try {
    const { data }: any = await request.post('/ai/chatFirstPageAi', {
      messages: [
        {
          role: "user",
          content: question
        }
      ],validateId: authorName.value
    })
    
    const fullAnswer = data?.content || '抱歉，我暂时无法回答这个问题。'
    
    // 模拟流式输出
    return new Promise<void>((resolve) => {
      let index = 0
      const interval = setInterval(() => {
        if (index < fullAnswer.length) {
          streamingContent.value += fullAnswer[index]
          index++
        } else {
          clearInterval(interval)
          aiAnswer.value = fullAnswer
          resolve()
        }
      }, 30) // 每个字符30ms，模拟打字效果
    })
  } catch (error) {
    throw error
  }
}

// 重置对话，返回聊天模式
const resetChat = () => {
  mode.value = 'chat'
  userInput.value = ''
  aiAnswer.value = ''
  streamingContent.value = ''
  isStreaming.value = false
}

// 填充问题到输入框
const fillQuestion = (message: string) => {
  userInput.value = message
}

// 处理第一次握手
const showHandshakeDialog = ref(false)
const authorName = ref('')
const authorNameError = ref('')

const handleFirstHandshake = () => {
  // 重置输入和错误信息
  authorName.value = ''
  authorNameError.value = ''
  // 显示输入对话框
  showHandshakeDialog.value = true
}

const validateAndSubmit = () => {
  // 验证输入是否为全英文小写
  const lowercasePattern = /^[a-z]+$/;
  
  if (!authorName.value.trim()) {
    authorNameError.value = '请输入作者名称'
    return
  }
  
  if (!lowercasePattern.test(authorName.value)) {
    authorNameError.value = '作者名称必须是全英文小写'
    return
  }
  
  // 验证通过，构建消息
  const handshakeMessage = `与作者${authorName.value}进行第一次握手，请建立连接并通知他好好工作`
  userInput.value = handshakeMessage
  
  // 关闭对话框
  showHandshakeDialog.value = false
}
</script>

<style lang="less" scoped>
.ai-chat-once-container {
  width: 100%;
  max-width: 900px;
  height: 650px;
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
  margin: 40px auto;
  display: flex;
  flex-direction: column;
}

.mode-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
}

/* 输入区域 */
.input-section {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    
    textarea {
      width: 100%;
      min-height: 120px; /* 设置最小高度 */
      padding: 16px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      resize: none;
      font-size: 14px;
      line-height: 1.6;
      outline: none;
      transition: all 0.3s;
      font-family: inherit;
      color: var(--text-main);
      background: var(--bg-color);
      
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        background: var(--card-bg);
      }
      
      &::placeholder {
        color: var(--text-secondary);
      }
    }
    
    .char-count {
      position: absolute;
      bottom: 40px; /* 调整字符计数位置，为按钮腾出空间 */
      right: 16px;
      font-size: 12px;
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.9);
      padding: 2px 6px;
      border-radius: 10px;
      z-index: 1;
    }
  }
  
  /* 快捷问题按钮样式 */
  .quick-questions {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
  }
  
  .quick-question-button {
      padding: 6px 12px;
      border: 1px solid var(--primary-color);
      border-radius: 16px;
      background: rgba(16, 185, 129, 0.05);
      color: var(--primary-color);
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      
      /* 第一次握手按钮特殊样式 */
      &.first-handshake-button {
        border: 1px solid var(--secondary-color);
        background: rgba(139, 92, 246, 0.05);
        color: var(--secondary-color);
        
        &:hover {
          background: var(--secondary-color);
          border-color: var(--secondary-color);
          color: #fff;
          box-shadow: var(--shadow-sm);
        }
      }
    
    &:hover {
      background: var(--primary-color);
      color: #fff;
      border-color: var(--primary-color);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }
  }

/* 回答区域 */
.answer-section {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #E5E7EB;
    border-radius: 2px;
  }
}

.user-question,
.ai-answer {
  margin-bottom: 16px;
}

.question-label,
.answer-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.question-content {
  background: var(--bg-color);
  padding: 12px 16px;
  border-radius: var(--radius-lg);
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-main);
}

.answer-content {
  background: rgba(16, 185, 129, 0.05);
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(16, 185, 129, 0.2);
  min-height: 80px;
  position: relative;
}

.streaming-content,
.completed-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-main) !important;
  white-space: pre-wrap;
  word-break: break-word;
}

.cursor {
  animation: blink 1s infinite;
  color: var(--primary-color);
  font-weight: bold;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 操作按钮 */
.action-button {
  position: absolute;
  bottom: 20px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s;
  box-shadow: var(--shadow-md);
}

.send-button {
  background: var(--primary-color);
  color: #fff;
  
  &:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
  }
  
  &:disabled {
    background: var(--bg-color);
    color: var(--text-secondary);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}

.back-button {
  background: var(--secondary-color);
  color: #fff;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
  }
}

/* 确保按钮图标正确显示 */
.icon-send::before {
  content: "\e61a"; /* iconfont send icon code if known, or use arrow */
}

.icon-back::before {
  content: "\e624";
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-chat-once-container {
    width: 100%;
    max-width: 100%;
    height: 360px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin: 0;
  }
  
  .mode-container {
    padding: 16px;
    min-height: 360px;
  }
  
  .input-section {
    margin-bottom: 16px;
    
    textarea {
      font-size: 14px;
      padding: 12px;
      min-height: 100px;
    }
    
    .char-count {
      bottom: 35px;
      right: 12px;
    }
  }
  
  .quick-questions {
    gap: 10px;
    margin-top: 10px;
  }
  
  .quick-question-button {
    padding: 5px 10px;
    font-size: 11px;
    
    &:hover {
      transform: translateY(-1px);
    }
  }

  .char-count {
    font-size: 12px;
    right: 12px;
    bottom: 12px;
  }
  
  .answer-section {
    margin-bottom: 60px;
    max-height: 220px;
  }
  
  .user-question,
  .ai-answer {
    margin-bottom: 16px;
  }
  
  .question-label,
  .answer-label {
    font-size: 13px;
    margin-bottom: 8px;
  }
  
  .question-content {
    font-size: 14px;
    padding: 10px;
  }
  
  .streaming-content,
  .completed-content {
    font-size: 14px;
    line-height: 1.5;
  }
  
  .action-button {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}

/* 小屏幕手机优化 */
@media (max-width: 400px) {
  .ai-chat-once-container {
    height: 340px;
  }
  
  .mode-container {
    padding: 14px;
    min-height: 340px;
  }
  
  .action-button {
    bottom: 12px;
    right: 12px;
    width: 44px;
    height: 44px;
  }
}

/* 第一次握手对话框样式 */
.handshake-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.handshake-dialog {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: var(--shadow-lg);
  animation: dialogFadeIn 0.3s ease-out;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.handshake-dialog h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: var(--text-main);
  font-weight: 600;
}

.dialog-description {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.input-wrapper {
  margin-bottom: 20px;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: 14px;
  transition: all 0.3s;
  outline: none;
  box-sizing: border-box;
  background: var(--bg-color);
  color: var(--text-main);
}

.input-wrapper input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  background: var(--card-bg);
}

.error-message {
  color: #EF4444;
  font-size: 12px;
  margin: 8px 0 0 0;
}

.dialog-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.cancel-button,
.confirm-button {
  padding: 8px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.cancel-button {
  background: var(--bg-color);
  color: var(--text-secondary);
}

.cancel-button:hover {
  background: #E5E7EB;
}

.confirm-button {
  background: var(--primary-color);
  color: white;
}

.confirm-button:hover {
  background: var(--primary-hover);
}

/* 移动端对话框适配 */
@media (max-width: 768px) {
  .handshake-dialog {
    width: 85%;
    padding: 20px;
  }
  
  .handshake-dialog h3 {
    font-size: 16px;
  }
  
  .dialog-actions {
    justify-content: space-between;
  }
  
  .cancel-button,
  .confirm-button {
    flex: 1;
    padding: 10px 16px;
  }
}
</style>