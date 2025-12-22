<template>
  <div class="profile-page">
    <div class="profile-bg"></div>
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-wrapper">
            <img :src="headerSrc" class="avatar" v-if="headerSrc" />
            <div class="avatar-placeholder" v-else>
              <i class="iconfont icon-user"></i>
            </div>
          </div>
          <h1 class="name">{{ userInfo.nicker || '站长' }}</h1>
          <p class="intro">{{ userInfo.intro || '暂无简介' }}</p>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <h3 class="label">
              <i class="iconfont icon-work"></i> 关于工作
            </h3>
            <p class="content">{{ userInfo.job || '保密' }}</p>
          </div>

          <div class="info-item">
            <h3 class="label">
              <i class="iconfont icon-flag"></i> 网站宗旨
            </h3>
            <p class="content">{{ userInfo.slogan || '分享技术，记录生活' }}</p>
          </div>

          <div class="info-item full-width">
            <h3 class="label">
              <i class="iconfont icon-contact"></i> 联系方式
            </h3>
            <div class="contact-list">
              <div class="contact-item" v-if="userInfo.email">
                <span class="type">邮箱：</span>
                <a :href="'mailto:' + userInfo.email" class="value link">{{ userInfo.email }}</a>
              </div>
              <div class="contact-item" v-if="userInfo.wechat">
                <span class="type">微信：</span>
                <span class="value">{{ userInfo.wechat }}</span>
              </div>
            </div>
          </div>

          <div class="info-item full-width" v-if="imgSrc">
            <h3 class="label">
              <i class="iconfont icon-heart"></i> 赞助支持
            </h3>
            <div class="reward-box">
              <img :src="imgSrc" class="reward-code" alt="赞助二维码" />
              <p class="reward-hint">感谢您的支持！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import request from '@/utils/request'

const userInfo = ref({
  job: '',
  intro: '',
  email: '',
  wechat: '',
  slogan: '',
  rewardCode: '',
  avatar: '',
  nicker: ''
})

const fetchUserInfo = async () => {
  try {
    const { data }: any = await request.post('/site/getWebmasterInfo')
    if (data) {
      userInfo.value = data
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
}

fetchUserInfo()

const imgSrc = computed(() => userInfo.value.rewardCode || '')
const headerSrc = computed(() => userInfo.value.avatar || '')
</script>

<style lang="less" scoped>
.profile-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;
  padding: 60px 20px;
}

.profile-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 800px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
    filter: blur(40px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    filter: blur(40px);
  }
}

.profile-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.profile-card {
  width: 100%;
  max-width: 800px;
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 60px 40px;
  border: 1px solid var(--border-color);
  animation: slideUp 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-header {
  text-align: center;
  margin-bottom: 50px;

  .avatar-wrapper {
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #fff;
    box-shadow: var(--shadow-md);
    position: relative;
    background: #fff;
    
    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 100%;
      height: 100%;
      background: var(--bg-color);
      display: flex;
      align-items: center;
      justify-content: center;
      
      .iconfont {
        font-size: 60px;
        color: var(--text-secondary);
      }
    }
  }

  .name {
    font-size: 32px;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 12px;
  }

  .intro {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

.info-item {
  &.full-width {
    grid-column: 1 / -1;
  }

  .label {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    .iconfont {
      color: var(--primary-color);
      font-size: 20px;
    }
  }

  .content {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    padding-left: 28px;
    background: var(--bg-color);
    padding: 16px;
    border-radius: var(--radius-lg);
  }
}

.contact-list {
  padding-left: 28px;
  
  .contact-item {
    margin-bottom: 12px;
    font-size: 16px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    
    .type {
      color: var(--text-main);
      font-weight: 500;
      min-width: 60px;
    }

    .link {
      color: var(--primary-color);
      text-decoration: none;
      transition: color 0.3s;
      
      &:hover {
        color: var(--primary-hover);
        text-decoration: underline;
      }
    }
  }
}

.reward-box {
  padding-left: 28px;
  text-align: center;
  background: var(--bg-color);
  padding: 24px;
  border-radius: var(--radius-lg);
  max-width: 300px;
  margin: 0 auto;
  border: 1px dashed var(--primary-color);
  
  .reward-code {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: var(--radius-md);
    margin-bottom: 12px;
    background: #fff;
    padding: 8px;
  }
  
  .reward-hint {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
  }
}
</style>
