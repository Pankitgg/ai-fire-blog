<!--
 * @Author: Shaoli
 * @Date: 2023-02-26 17:42:44
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-26 21:58:58
 * @Description: 请填写文件描述
-->
<template>
  <div class="tag-container">
    <div class="tag-header">
      <div class="header-content">
        <div class="back-btn" @click="goback">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="tag-info">
          <div class="tag-icon">
            <i class="iconfont icon-tag"></i>
          </div>
          <h1 class="tag-title">{{ route.params.id }}</h1>
          <span class="tag-count" v-if="state.list.length > 0">
            {{ state.list.length }} 篇文章
          </span>
        </div>
      </div>
    </div>
    
    <div class="article-list-wrapper">
      <div 
        class="article-grid"
        v-infinite-scroll="load" 
        :infinite-scroll-disabled="!state.hasMore"
        :infinite-scroll-distance="20"
      >
        <ArticleItem
          v-for="(item, index) in state.list"
          :key="index"
          :item="item"
        />
      </div>
      
      <div v-if="loading" class="loading-state">
        <i class="iconfont icon-loading"></i>
        <span>加载中...</span>
      </div>
      
      <div v-if="!state.hasMore && state.list.length > 0" class="no-more">
        <span>已经到底啦 ~</span>
      </div>
      
      <el-empty v-if="!loading && state.list.length === 0" description="暂无相关文章" :image-size="200"></el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request'
import ArticleItem from '../../components/global/ArticleItem.vue'

const route = useRoute()
const router = useRouter()

const goback = () => {
  router.go(-1)
}

let pageNum = ref<number>(1)
const loading = ref(false)
const state = reactive({
  list: [],
  hasMore: true
})

const load = async () => {
  if (!state.hasMore || loading.value) return
  
  loading.value = true
  try {
    const { data }: any = await request.post('/blog/getBlogListByTag', {
      pageNum: pageNum.value,
      pageSize: 10,
      name: route.params.id
    })
    
    pageNum.value++
    state.hasMore = data?.hasMore as boolean
    state.list = state.list.concat(data?.list || [])
  } catch (error) {
    console.error('获取标签文章失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.tag-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 60px);
}

.tag-header {
  margin-bottom: 40px;
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  
  .header-content {
    display: flex;
    align-items: flex-start;
  }
  
  .back-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    margin-right: 24px;
    background: var(--bg-secondary);
    color: var(--text-secondary);
    
    &:hover {
      background: var(--primary-color);
      color: #fff;
      transform: translateX(-4px);
    }
  }
  
  .tag-info {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
    .tag-icon {
      width: 48px;
      height: 48px;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      
      .iconfont {
        font-size: 24px;
        color: var(--primary-color);
      }
    }
    
    .tag-title {
      font-size: 32px;
      font-weight: bold;
      color: var(--text-main);
      margin-right: 16px;
    }
    
    .tag-count {
      padding: 4px 12px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border-radius: 20px;
      font-size: 14px;
    }
  }
}

.article-list-wrapper {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  min-height: 400px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.loading-state,
.no-more {
  text-align: center;
  padding: 30px 0;
  color: var(--text-secondary);
  font-size: 14px;
  
  .iconfont {
    display: inline-block;
    animation: rotate 1s linear infinite;
    margin-right: 8px;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// 响应式设计
@media (max-width: 768px) {
  .tag-container {
    padding: 20px 16px;
  }
  
  .tag-header {
    padding: 20px;
    margin-bottom: 24px;
    
    .tag-info {
      .tag-title {
        font-size: 24px;
      }
      
      .tag-icon {
        width: 40px;
        height: 40px;
        
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
  
  .article-list-wrapper {
    padding: 16px;
  }
  
  .article-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
