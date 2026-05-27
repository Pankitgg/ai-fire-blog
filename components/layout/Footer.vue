<!--
 * @Author: Shaoli
 * @Date: 2023-02-12 12:31:28
 * @LastEditors: AI Assistant
 * @LastEditTime: 2025-07-01
 * @Description: 页面底部Footer
-->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-main">
        <div class="footer-section site-info">
          <img src="@/assets/images/logo1.png" class="logo" alt="Logo" />
          <p class="intro">
            {{ state.intro || '探索 AI 的无限可能，分享最前沿的技术资讯与实践经验。' }}
          </p>
        </div>

        <div class="footer-section">
          <div class="section-title">热门搜索</div>
          <div class="tag-list">
            <NuxtLink
              v-for="item in state.tags"
              :key="item"
              :to="`/tag/${item}`"
              class="tag-item"
            >
              {{ item }}
            </NuxtLink>
          </div>
        </div>

        <div class="footer-section">
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

        <div class="footer-section contact-section" v-if="state.noticeInfo?.content">
          <div class="section-title">公告</div>
          <div class="notice-content">{{ state.noticeInfo?.content }}</div>
        </div>
      </div>

      <div class="footer-bottom">
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
  </footer>
</template>

<script lang="ts" setup>
import request from '@/utils/request'

const links = ref<Record<string, string>[]>([])
const state = reactive({
  intro: '',
  icp: '',
  copyright: '',
  tags: [] as string[],
  noticeInfo: {
    content: ''
  }
})

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
  width: 100%;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.footer-section {
  &.site-info {
    .logo {
      height: 36px;
      margin-bottom: 12px;
    }

    .intro {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-secondary);
    }
  }
}

.section-title {
  font-size: 15px;
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

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 6px 12px;
  font-size: 13px;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border-radius: 6px;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    background: var(--primary-color);
    color: #fff;
    transform: translateY(-2px);
  }
}

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

.notice-content {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  background: var(--bg-primary);
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
}

.contact-section {
  @media (max-width: 640px) {
    display: none;
  }
}

.footer-bottom {
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-tertiary);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

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
    text-align: center;
    margin-top: 8px;
  }
}
</style>