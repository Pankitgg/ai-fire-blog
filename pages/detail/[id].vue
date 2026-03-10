<template>
  <div class="detail-page">
    <div class="article-container">
      <div class="article-header">
        <div class="back-nav" @click="goback">
          <i class="iconfont icon-back"></i>
          <span>返回</span>
        </div>
        <h1 class="article-title">{{ state.title }}</h1>
        <div class="article-meta">
          <span class="time">
            <i class="iconfont icon-time"></i>
            {{ dayjs(state.time).format('YYYY-MM-DD HH:mm') }}
          </span>
        </div>
      </div>

      <div class="article-content">
        <MdPreview
          class="md-preview"
          editor-id="preview-only"
          :model-value="state.content"
          preview-theme="default"
        />
      </div>
    </div>

    <div class="related-articles" v-if="state.list.length">
      <h3 class="related-title">作者的其他文章</h3>
      <div class="related-list">
        <ArticleItem
          v-for="(item, index) in state.list"
          :key="index"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request'

definePageMeta({
  layout: 'detail-layout'
})

import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const goback = () => {
  router.push('/blog')
}
const state = reactive({
  content: '',
  time: '',
  title: '',
  list: []
})

const getDetail = async () => {
  try {
    const { data }: any = await useAsyncData(
      `blog-detail-${route.params.id}`,
      () =>
        request.post('/blog/getBlogDetail', {
          id: Number(route.params.id)
        })
    )
    const res = data.value as any
    state.content = res?.data?.blog.content || ''
    state.time = res?.data?.blog.updateTime || ''
    state.title = res?.data?.blog.title || ''
    state.list = (res?.data?.list as []) || []
  } catch (error) {
    console.error('Failed to fetch blog detail:', error)
  }
}
await getDetail()
</script>

<style lang="less" scoped>
.detail-page {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
  padding-bottom: 40px;
}

.article-container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--card-bg);
  padding: 40px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 0;
  }
}

.article-header {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;

  .back-nav {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: 14px;
    margin-bottom: 20px;
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }
  }

  .article-title {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 16px;
    line-height: 1.4;
  }

  .article-meta {
    color: var(--text-secondary);
    font-size: 14px;
    display: flex;
    align-items: center;
    
    .time {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}

.article-content {
  :deep(.md-editor-preview-wrapper) {
    padding: 0;
  }
  
  :deep(.default-theme p) {
    line-height: 1.8;
    color: var(--text-main);
  }
}

.related-articles {
  max-width: 900px;
  margin: 40px auto 0;
  
  .related-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 20px;
    padding-left: 20px;
    border-left: 4px solid var(--primary-color);
    
    @media (max-width: 900px) {
      margin-left: 20px;
    }
  }

  .related-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 0 20px;
    
    @media (min-width: 940px) {
      padding: 0;
    }
  }
}
</style>
