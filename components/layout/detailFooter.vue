<!--
 * @Author: Shaoli
 * @Date: 2023-02-12 12:31:28
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-26 17:44:03
 * @Description: 右侧footer
-->
<template>
  <div class="footer">
    <div class="footer-fixed">
      <div class="author-card">
        <div class="author-header">
          <div class="avatar-wrapper">
            <img :src="imgSrc" class="avatar" alt="Author" />
          </div>
          <div class="author-info">
            <div class="name">{{ userInfo.nicker || 'AI Fire' }}</div>
            <div class="job">{{ userInfo.job || 'AI 探索者' }}</div>
          </div>
        </div>
        <div class="intro">{{ userInfo.intro || '分享 AI 技术与应用心得' }}</div>
      </div>

      <div class="catalog-section">
        <div class="section-title">
          <i class="iconfont icon-menu"></i>
          <span>目录</span>
        </div>
        <MdCatalog editor-id="preview-only" :scroll-element="scrollElement" class="md-catalog"/>
      </div>
      
      <div class="tags-section">
        <div class="section-title">
          <i class="iconfont icon-tag"></i>
          <span>热门搜索</span>
        </div>
        <div class="tag-list">
          <nuxt-link
            v-for="item in state.tags"
            :key="item"
            :to="`/tag/${item}`"
            class="tag-item"
          >
            {{ item }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MdCatalog } from 'md-editor-v3'
import request from '@/utils/request'

let scrollElement: HTMLElement | undefined = undefined
if (process.client) {
  scrollElement = document.documentElement
}

const userInfo = ref({
  job: '',
  intro: '',
  avatar: '',
  nicker: ''
})

const state = reactive({
  tags: []
})

// Combined data fetching
const fetchData = async () => {
  try {
    const [userInfoRes, tagsRes] = await Promise.all([
      request.post('/site/getWebmasterInfo'),
      request.post('/blog/getAllTags')
    ])
    
    if (userInfoRes.data) {
      userInfo.value = userInfoRes.data
    }
    
    if (tagsRes.data) {
      state.tags = tagsRes.data
    }
  } catch (error) {
    console.error('Failed to fetch detail footer data:', error)
  }
}

const imgSrc = computed(() => {
  return userInfo.value?.avatar || '/favicon.ico'
})

onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped>
.footer {
  width: 300px;
  flex-shrink: 0;
  margin-left: 20px;
  border-left: 1px solid var(--border-color);
  padding-left: 20px;
  
  @media (max-width: 1100px) {
    display: none;
  }
}

.footer-fixed {
  width: 280px;
  padding: 24px 0;
  position: fixed;
  top: 70px;
  height: calc(100vh - 70px);
  overflow-y: auto;
  padding-right: 10px;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  .author-card {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    
    .author-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      
      .avatar-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 12px;
        border: 2px solid #fff;
        box-shadow: var(--shadow-sm);
        
        .avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .author-info {
        .name {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 4px;
        }
        
        .job {
          font-size: 12px;
          color: var(--text-tertiary);
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }
      }
    }
    
    .intro {
      font-size: 13px;
      line-height: 1.6;
      color: var(--text-secondary);
      text-align: justify;
    }
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    
    .iconfont {
      margin-right: 8px;
      color: var(--primary-color);
      font-size: 18px;
    }
  }
  
  .catalog-section {
    margin-bottom: 30px;
    
    .md-catalog {
      max-height: 500px;
      overflow-y: auto;
      padding-left: 4px;
      
      /* Customize catalog styles */
      :deep(.md-editor-catalog-link) {
        font-size: 14px;
        color: var(--text-secondary);
        padding: 6px 0;
        
        &:hover, &.md-editor-catalog-active {
          color: var(--primary-color);
          font-weight: 500;
        }
        
        span {
          &:hover {
            color: var(--primary-color);
          }
        }
      }
      
      :deep(.md-editor-catalog-indicator) {
        background-color: var(--primary-color);
      }
    }
  }

  .tags-section {
    margin-bottom: 30px;
    
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .tag-item {
      padding: 6px 12px;
      font-size: 13px;
      color: var(--text-secondary);
      background: var(--bg-secondary);
      border-radius: 6px;
      transition: all 0.3s;
      text-decoration: none;
      
      &:hover {
        background: var(--primary-color);
        color: #fff;
        transform: translateY(-2px);
      }
    }
  }
}
</style>
