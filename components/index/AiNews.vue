<!--
 * @Author: Shaoli
 * @Date: 2023-02-26 22:00:00
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-26 22:00:00
 * @Description: AI资讯组件
-->
<template>
  <div class="ai-news-section">
    <div class="section-header">
      <h2>AI资讯</h2>
      <NuxtLink to="/blog" class="more-link">查看更多</NuxtLink>
    </div>
    <div class="news-grid">
      <NuxtLink v-for="(news, index) in newsList" :key="index" :to="news.link" class="news-card">
        <div class="news-image">
          <img :src="news.image" :alt="news.title" v-if="news.image"/>
          <div class="news-image-placeholder" v-else>
            <i class="iconfont icon-article"></i>
          </div>
        </div>
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-description">{{ news.description }}</p>
          <div class="news-meta">
            <span class="news-date">{{ news.date }}</span>
            <span class="news-source">{{ news.source }} 阅读</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import TimeUtil from '@/utils/time'

interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  date: string
  source: string
  link: string
}

const newsList = ref<NewsItem[]>([])

const fetchNewsData = async () => {
  try {
    // 获取分类列表
    const { data: cateData }: any = await request.post('/blog/getCateList')
    if (cateData && cateData.length > 0) {
      const firstCateId = cateData[0].id
      // 获取该分类下的博客列表
      const { data }: any = await request.post('/blog/getCateBlogList', {
        pageNum: 1,
        pageSize: 6,
        cateId: firstCateId
      })
      
      if (data && data.list) {
        newsList.value = data.list.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.intro,
          image: item.thumbnail,
          date: TimeUtil.timeFormat(+new Date(item.publishTime) / 1000),
          source: item.readCount || 0,
          link: `/detail/${item.id}`
        }))
      }
    }
  } catch (error) {
    console.error('Failed to fetch news data:', error)
  }
}

onMounted(() => {
  fetchNewsData()
})
</script>

<style lang="less" scoped>
.ai-news-section {
  margin-bottom: 40px;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #21293c;
    margin: 0;
  }
  
  .more-link {
    font-size: 14px;
    color: #31c48c;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #20a878;
    }
  }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.news-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
}

.news-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .news-card:hover & img {
    transform: scale(1.05);
  }
}

.news-content {
  padding: 16px;
}

.news-title {
  font-size: 18px;
  font-weight: 600;
  color: #21293c;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-description {
  font-size: 14px;
  color: #67788a;
  margin: 0 0 12px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9daab5;
  
  .news-date,
  .news-source {
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .news-card {
    flex-direction: column;
  }
  
  .news-image {
    height: 200px;
  }
}
</style>