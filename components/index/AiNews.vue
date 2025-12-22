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
      <a href="#" class="more-link">查看更多</a>
    </div>
    <div class="news-grid">
      <div v-for="(news, index) in newsList" :key="index" class="news-card">
        <div class="news-image">
          <img :src="news.image" :alt="news.title" />
        </div>
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-description">{{ news.description }}</p>
          <div class="news-meta">
            <span class="news-date">{{ news.date }}</span>
            <span class="news-source">{{ news.source }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

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

// 模拟数据 - 实际项目中应从API获取
const mockNewsData: NewsItem[] = [
  {
    id: 1,
    title: "OpenAI发布GPT-4，多模态能力全面提升",
    description: "OpenAI最新发布的GPT-4模型在多模态理解、推理能力和安全性方面都有显著提升...",
    image: "https://picsum.photos/id/1/300/200",
    date: "2023-03-15",
    source: "TechCrunch",
    link: "#"
  },
  {
    id: 2,
    title: "谷歌推出PaLM 2，挑战OpenAI的GPT系列",
    description: "谷歌在I/O开发者大会上推出新一代大语言模型PaLM 2，支持40多种语言...",
    image: "https://picsum.photos/id/2/300/200",
    date: "2023-05-10",
    source: "Google Blog",
    link: "#"
  },
  {
    id: 3,
    title: "Meta开源Llama 2，推动AI民主化进程",
    description: "Meta公司宣布开源Llama 2大语言模型，允许开发者和企业自由使用和修改...",
    image: "https://picsum.photos/id/3/300/200",
    date: "2023-07-18",
    source: "Meta AI",
    link: "#"
  },
  {
    id: 4,
    title: "AI绘画工具Midjourney V5.2发布，支持超高清图像",
    description: "Midjourney最新版本V5.2带来了更高的图像质量、更精确的提示词理解和新的缩放功能...",
    image: "https://picsum.photos/id/4/300/200",
    date: "2023-06-22",
    source: "Midjourney Blog",
    link: "#"
  }
]

const fetchNewsData = async () => {
  try {
    // 实际项目中应使用API获取数据
    // const { data } = await request.get('/ai-news/list')
    // newsList.value = data
    
    // 使用模拟数据
    newsList.value = mockNewsData
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