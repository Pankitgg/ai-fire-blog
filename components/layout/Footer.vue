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
      <div v-if="state.noticeInfo?.content" class="notice-card">
        <div class="notice-title">
          <i class="iconfont icon-notification"></i>
          <span>公告</span>
        </div>
        <div class="notice-content">{{ state.noticeInfo?.content }}</div>
      </div>

      <div class="site-info">
        <img src="@/assets/images/logo1.png" class="logo" alt="Logo" />
        <p class="intro">
          {{ state.intro || '探索 AI 的无限可能，分享最前沿的技术资讯与实践经验。' }}
        </p>
      </div>
      
      <div class="tags-section">
        <div class="section-title">热门搜索</div>
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
      
      <MdCatalog editor-id="preview-only" :scroll-element="scrollElement" class="catalog-wrapper" />

      <div class="friend-links">
        <div class="section-title">友情链接</div>
        <div class="links-list">
          <a
            class="link-item"
            v-for="item in links"
            target="_blank"
            rel="nofollow"
            :href="item.url"
            :key="item.id"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
      
      <div class="copyright-info">
        <a href="/sitemap.xml" target="_blank" class="sitemap-link">Sitemap</a>
        <span class="divider">|</span>
        <a
          target="_blank"
          rel="nofollow"
          href="https://beian.miit.gov.cn"
          class="beian"
        >
          {{ state.icp }}
        </a>
        <div class="copyright">{{ state.copyright }}</div>
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

const links = ref<Record<string, string>[]>([])
const state = reactive({
  intro: '',
  icp: '',
  copyright: '',
  tags: [],
  noticeInfo: {
    content: ''
  }
})

// Data fetching
const fetchData = async () => {
  try {
    const [friendLinks, siteInfo, tags, notices] = await Promise.all([
      request.post('/site/getFriendLinkList'),
      request.post('/site/getSiteInfo'),
      request.post('/blog/getAllTags'),
      request.post('/site/getNoticeList')
    ])
    
    if (friendLinks.data) links.value = friendLinks.data.list || []
    
    if (siteInfo.data) {
      state.copyright = siteInfo.data.copyright || ''
      state.intro = siteInfo.data.intro || ''
      state.icp = siteInfo.data.icp || ''
    }
    
    if (tags.data) state.tags = tags.data || []
    
    if (notices.data?.list) {
      state.noticeInfo = notices.data.list[0] || null
    }
  } catch (error) {
    console.error('Failed to fetch footer data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped>
.footer {
  width: 320px;
  flex-shrink: 0;
  margin-left: 20px;
  
  @media (max-width: 1100px) {
    display: none;
  }
}

.footer-fixed {
  width: 320px;
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
  
  .notice-card {
    background: linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 149, 0, 0.05) 100%);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 149, 0, 0.2);
    
    .notice-title {
      display: flex;
      align-items: center;
      color: #ff9500;
      font-weight: 600;
      margin-bottom: 8px;
      
      .iconfont {
        margin-right: 6px;
      }
    }
    
    .notice-content {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
    }
  }
  
  .site-info {
    margin-bottom: 30px;
    
    .logo {
      height: 40px;
      margin-bottom: 12px;
    }
    
    .intro {
      font-size: 14px;
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
    position: relative;
    padding-left: 12px;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 16px;
      background: var(--primary-color);
      border-radius: 2px;
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
  
  :deep(.md-editor-catalog) {
    .md-editor-catalog-link {
      color: var(--text-secondary);
      padding: 4px 0;
      
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
    
    .md-editor-catalog-indicator {
      background-color: var(--primary-color);
    }
  }
  
  .friend-links {
    margin-top: 30px;
    
    .links-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .link-item {
      font-size: 13px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s;
      
      &:hover {
        color: var(--primary-color);
        text-decoration: underline;
      }
    }
  }
  
  .copyright-info {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
    font-size: 12px;
    color: var(--text-tertiary);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    .sitemap-link, .beian {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s;
      
      &:hover {
        color: var(--text-secondary);
      }
    }
    
    .divider {
      margin: 0 8px;
      color: var(--border-color);
    }
    
    .copyright {
      width: 100%;
      margin-top: 8px;
    }
  }
}
</style>
