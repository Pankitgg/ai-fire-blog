<!--
 * @Author: Shaoli
 * @Date: 2023-02-26 22:00:00
 * @LastEditors: AI Assistant
 * @LastEditTime: 2025-07-01
 * @Description: AI资讯组件
-->
<template>
  <div class="news-ranking-container">
    <!-- 左侧：AI资讯列表（80%宽度） -->
    <div class="ai-news-section">
      <div class="section-header">
        <h2>最新AI资讯</h2>
        <NuxtLink to="/blog" class="more-link">查看更多</NuxtLink>
      </div>
      <div class="news-grid">
        <NuxtLink v-for="(news, index) in newsList" :key="index" :to="news.link" class="news-card">
          <div class="news-image">
            <img :src="news.image" :alt="news.title" v-if="news.image"/>
            <div class="news-image-placeholder" v-else>
              <i class="iconfont icon-article"></i>
            </div>
            <div class="news-image-overlay">
              <h3 class="news-title">{{ news.title }}</h3>
            </div>
          </div>
          <div class="news-content">
            <p class="news-description">{{ news.description }}</p>
            <div class="news-meta">
              <span class="news-date">{{ news.date }}</span>
              <span class="news-source">{{ news.source }} 阅读</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- 右侧：排行榜（20%宽度） -->
    <div class="ranking-section">
      <div class="ranking-card">
        <div class="ranking-header">
          <h3>一周热门文章</h3>
        </div>
        <div class="ranking-list">
          <NuxtLink 
            v-for="(item, index) in rankingList" 
            :key="index" 
            :to="item.link" 
            class="ranking-item"
          >
            <span class="rank-badge" :class="getRankClass(index)">{{ index + 1 }}</span>
            <div class="ranking-content">
              <span class="ranking-title">{{ item.title }}</span>
              <span class="ranking-views">{{ item.views }} 阅读</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

interface RankingItem {
  id: number
  title: string
  views: number
  link: string
}

const newsList = useState<NewsItem[]>('aiNewsList', () => [])
const rankingList = useState<RankingItem[]>('rankingList', () => [])

const fetchNewsData = async () => {
  if (newsList.value.length > 0) return

  try {
    const { data: cateData }: any = await request.post('/blog/getCateList')
    if (cateData && cateData.length > 0) {
      const firstCateId = cateData[0].id
      const { data }: any = await request.post('/blog/getCateBlogList', {
        pageNum: 1,
        pageSize: 10,
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

const fetchRankingData = async () => {
  if (rankingList.value.length > 0) return

  try {
    const { data }: any = await request.post('/blog/getHotBlogList', {
      pageNum: 1,
      pageSize: 8,
      hotday: 7
    })

    if (data && data.list) {
      rankingList.value = data.list.map((item: any) => ({
        id: item.id,
        title: item.title,
        views: item.readCount || 0,
        link: `/detail/${item.id}`
      }))
    } else {
      // Mock data if API fails
      rankingList.value = [
        { id: 1, title: '2025年AI发展趋势预测', views: 12580, link: '/detail/1' },
        { id: 2, title: 'GPT-5发布：革命性升级', views: 10320, link: '/detail/2' },
        { id: 3, title: 'AI绘画技术突破', views: 8960, link: '/detail/3' },
        { id: 4, title: '大模型部署最佳实践', views: 7540, link: '/detail/4' },
        { id: 5, title: 'AI安全与伦理探讨', views: 6780, link: '/detail/5' },
        { id: 6, title: 'AI编程效率提升技巧', views: 5420, link: '/detail/6' },
        { id: 7, title: '多模态AI应用案例', views: 4890, link: '/detail/7' },
        { id: 8, title: 'AI辅助教育新模式', views: 4350, link: '/detail/8' },
     
      ]
    }
  } catch (error) {
    console.error('Failed to fetch ranking data:', error)
    rankingList.value = [
      { id: 1, title: '2025年AI发展趋势预测', views: 12580, link: '/detail/1' },
      { id: 2, title: 'GPT-5发布：革命性升级', views: 10320, link: '/detail/2' },
      { id: 3, title: 'AI绘画技术突破', views: 8960, link: '/detail/3' },
      { id: 4, title: '大模型部署最佳实践', views: 7540, link: '/detail/4' },
      { id: 5, title: 'AI安全与伦理探讨', views: 6780, link: '/detail/5' },
      { id: 6, title: 'AI编程效率提升技巧', views: 5420, link: '/detail/6' },
      { id: 7, title: '多模态AI应用案例', views: 4890, link: '/detail/7' },
      { id: 8, title: 'AI辅助教育新模式', views: 4350, link: '/detail/8' },
    
    ]
  }
}

const getRankClass = (index: number) => {
  if (index === 0) return 'rank-first'
  if (index === 1) return 'rank-second'
  if (index === 2) return 'rank-third'
  return ''
}

onMounted(() => {
  fetchNewsData()
  fetchRankingData()
})
</script>

<style lang="less" scoped>
.news-ranking-container {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.ai-news-section {
  width: 80%;
  flex-shrink: 0;
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
  grid-template-columns: repeat(min(5, auto-fill), minmax(100px, 1fr));
  gap: 16px;
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
  height: 160px;
  overflow: hidden;
  position: relative;

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

.news-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 12px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  
  .news-title {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
}

.news-content {
  padding: 14px;
}

.news-description {
  font-size: 13px;
  color: #67788a;
  margin: 0 0 10px 0;
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

/* 排行榜样式 */
.ranking-section {
  width: 20%;
  flex-shrink: 0;
}

.ranking-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: fit-content;
}

.ranking-header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }
}

.ranking-list {
  padding: 12px 0;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s;

  &:hover {
    background: #f8f9fa;
  }
}

.rank-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #67788a;
  margin-right: 12px;
  flex-shrink: 0;

  &.rank-first {
    background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
    color: #fff;
  }

  &.rank-second {
    background: linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 100%);
    color: #fff;
  }

  &.rank-third {
    background: linear-gradient(135deg, #cd7f32 0%, #b87333 100%);
    color: #fff;
  }
}

.ranking-content {
  flex: 1;
  min-width: 0;
}

.ranking-title {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #21293c;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-views {
  display: block;
  font-size: 11px;
  color: #9daab5;
  margin-top: 4px;
}

@media (max-width: 1024px) {
  .news-ranking-container {
    flex-direction: column;
  }

  .ai-news-section {
    width: 100%;
  }

  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .ranking-section {
    width: 100%;
  }

  .ranking-card {
    max-width: none;
    width: 100%;
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
    height: 180px;
  }
}
</style>