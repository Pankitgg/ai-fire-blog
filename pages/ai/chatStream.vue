<!--
 * @Author: AI Assistant
 * @Date: 2023-07-01
 * @Description: AI对话组件
-->
<template>
  <div class="ai-chat-container">
    <div class="chat-header">
      <div class="header-left">
        <i class="iconfont icon-robot"></i>
        <span>AI 助手</span>
      </div>
      <div class="header-right">
        <span class="status-dot"></span>
        <span class="status-text">在线</span>
      </div>
    </div>
    
    <div class="chat-history">
      <!-- 欢迎消息 -->
      <div v-if="messages.length === 0" class="welcome-message">
        <div class="ai-avatar">
          <i class="iconfont icon-robot"></i>
        </div>
        <div class="message-content">
          <p>你好！我是你的 AI 助手。你可以向我提问、寻求建议或进行日常交流。</p>
        </div>
      </div>
      
      <!-- 对话历史 -->
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message-item', message.role === 'user' ? 'user-message' : 'ai-message']"
      >
        <div class="avatar">
          <i v-if="message.role === 'user'" class="iconfont icon-user"></i>
          <i v-else class="iconfont icon-robot"></i>
        </div>
        <div class="message-content">
          <div class="content">{{ message.content }}</div>
          <div class="time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
      
      <!-- 打字动画 -->
      <div v-if="isTyping" class="message-item ai-message">
        <div class="avatar">
          <i class="iconfont icon-robot"></i>
        </div>
        <div class="message-content typing">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="chat-input-area">
      <textarea
        v-model="inputMessage"
        @keyup.enter.ctrl="sendMessage"
        @keyup.enter.meta="sendMessage"
        placeholder="请输入您的问题...(按Ctrl+Enter发送)"
        maxlength="1000"
        rows="3"
      ></textarea>
      <div class="input-footer">
        <span class="char-count">{{ inputMessage.length }}/1000</span>
        <button 
          class="send-button" 
          @click="sendMessage"
          :disabled="!inputMessage.trim() || isTyping"
        >
          <i class="iconfont icon-send"></i>
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/utils/request'
import dayjs from 'dayjs'

// 定义消息类型
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 响应式数据
const messages = ref<Message[]>([])
const inputMessage = ref('')
const isTyping = ref(false)

// 发送消息
const sendMessage = async () => {
  const content = inputMessage.value.trim()
  if (!content || isTyping.value) return
  
  // 添加用户消息
  const userMessage: Message = {
    role: 'user',
    content,
    timestamp: Date.now()
  }
  messages.value.push(userMessage)
  
  // 清空输入框
  inputMessage.value = ''
  
  // 滚动到底部
  scrollToBottom()
  
  // 设置为正在输入状态
  isTyping.value = true
  
  try {
    // 调用AI接口
    const { data }: any = await request.post('/ai/chatFirstPageAi', {
      messages: [
        {
          role: "user",
          content: content
        }
      ]
    })
    
    // 添加AI回复
    const aiMessage: Message = {
      role: 'assistant',
      content: data?.content || '抱歉，我暂时无法回答这个问题。',
      timestamp: Date.now()
    }
    messages.value.push(aiMessage)
  } catch (error) {
    console.error('AI接口调用失败:', error)
    
    // 添加错误消息
    const errorMessage: Message = {
      role: 'assistant',
      content: '抱歉，我现在暂时无法为您提供回答，请稍后再试。',
      timestamp: Date.now()
    }
    messages.value.push(errorMessage)
  } finally {
    // 取消正在输入状态
    isTyping.value = false
    
    // 滚动到底部
    scrollToBottom()
  }
}

// 格式化时间
const formatTime = (timestamp: number) => {
  return dayjs(timestamp).format('HH:mm:ss')
}

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    const chatHistory = document.querySelector('.chat-history')
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight
    }
  }, 100)
}
</script>

<style lang="less" scoped>
.ai-chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.chat-header {
  padding: 16px 24px;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .header-left {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-main);
    
    .iconfont {
      margin-right: 8px;
      font-size: 20px;
      color: var(--primary-color);
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--text-secondary);
    
    .status-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      margin-right: 6px;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    }
  }
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: var(--bg-secondary);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
    
    &:hover {
      background: var(--text-secondary);
    }
  }
}

.welcome-message {
  display: flex;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  align-items: flex-start;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.message-item {
  display: flex;
  margin-bottom: 24px;
  
  &.user-message {
    flex-direction: row-reverse;
    
    .message-content {
      margin-right: 0;
      margin-left: 16px;
      background: var(--primary-color);
      color: #fff;
      border: none;
      border-radius: 16px 16px 0 16px;
      box-shadow: var(--shadow-md);
      
      .content {
        color: #fff;
      }
      
      .time {
        color: rgba(255, 255, 255, 0.7);
        text-align: right;
      }
    }
  }
  
  &.ai-message {
    .message-content {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 16px 16px 16px 0;
      box-shadow: var(--shadow-sm);
    }
  }
}

.avatar,
.ai-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
  
  .iconfont {
    color: #fff;
    font-size: 20px;
  }
}

.ai-avatar {
  background: var(--primary-color);
}

.user-message .avatar {
  background: var(--secondary-color);
}

.message-content {
  margin-right: 16px;
  padding: 14px 18px;
  max-width: 75%;
  word-wrap: break-word;
  
  .content {
    line-height: 1.6;
    color: var(--text-main);
  }
  
  .time {
    margin-top: 8px;
    font-size: 12px;
    color: var(--text-secondary);
  }
}

.welcome-message .message-content {
  background: none;
  border: none;
  max-width: none;
  margin-right: 0;
  padding: 0 16px;
  box-shadow: none;
  
  p {
    margin: 0;
    color: var(--text-main);
    line-height: 1.6;
  }
}

/* 打字动画 */
.typing {
  min-width: 80px;
  min-height: 40px;
}

.typing-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  span {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background: var(--text-secondary);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out both;
    opacity: 0.6;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 输入区域 */
.chat-input-area {
  padding: 24px;
  background: var(--bg-color);
  border-top: 1px solid var(--border-color);
}

textarea {
  width: 100%;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  outline: none;
  background: var(--bg-secondary);
  color: var(--text-main);
  transition: all 0.3s;
  font-family: inherit;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    background: var(--bg-color);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.char-count {
  font-size: 12px;
  color: var(--text-secondary);
}

.send-button {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: var(--shadow-sm);
  
  .iconfont {
    margin-right: 6px;
    font-size: 14px;
  }
  
  &:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:disabled {
    background: var(--border-color);
    color: var(--text-secondary);
    cursor: not-allowed;
    box-shadow: none;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-chat-container {
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    border: none;
  }
  
  .chat-header {
    padding: 12px 16px;
  }
  
  .chat-history {
    padding: 16px;
  }
  
  .message-content {
    max-width: 85%;
    padding: 12px 14px;
  }
  
  .chat-input-area {
    padding: 12px;
  }
  
  textarea {
    padding: 12px;
  }
}
</style>