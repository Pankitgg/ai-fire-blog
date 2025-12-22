<template>
  <div class="special-detail-container">
    <div class="common-title">
      <div class="back-btn" @click="goback">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="title">专栏详情</div>
    </div>
    
    <div class="content-wrapper">
      <div class="chapter-list" v-if="specialList.length">
        <div v-for="(item, index) in specialList" :key="item.id" class="item">
          <NuxtLink
            :to="`/specialColumnDetail?specialId=${route.params.id}&id=${item.id}`"
            class="item-link"
          >
            <div class="item-index">{{ index + 1 }}</div>
            <div class="item-info">
              <h3 class="single-ellipsis title">{{ item.title }}</h3>
              <div class="time">
                <i class="iconfont icon-time"></i>
                {{ dayjs(item.publishTime).format('YYYY-MM-DD HH:mm') }}
              </div>
            </div>
            <i class="iconfont icon-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
      <el-empty v-else description="暂无专栏文章" :image-size="200"></el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { specialItem } from '@/server/api/special/getSpecialDetail'
import request from '@/utils/request'

const router = useRouter()
const route = useRoute()
const goback = () => {
  router.go(-1)
}

let specialList = ref<specialItem[]>([])

const getSpecialDetail = async () => {
  try {
    const { data }: any = await request.post('/special/getSpecialDetail', {
      specialId: Number(route.params.id)
    })
    specialList.value = data?.list || []
  } catch (error) {
    console.error('获取专栏详情失败:', error)
  }
}

getSpecialDetail()
</script>

<style lang="less" scoped>
.special-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 60px);
}

.common-title {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  
  .back-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    margin-right: 16px;
    color: var(--text-secondary);
    
    &:hover {
      background: var(--bg-secondary);
      color: var(--primary-color);
    }
    
    .iconfont {
      font-size: 20px;
    }
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: var(--text-main);
  }
}

.content-wrapper {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
  border: 1px solid var(--border-color);
}

.chapter-list {
  .item {
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-link {
      display: flex;
      align-items: center;
      padding: 20px;
      text-decoration: none;
      transition: all 0.3s;
      border-radius: var(--radius-md);
      
      &:hover {
        background: var(--bg-secondary);
        transform: translateX(4px);
        
        .title {
          color: var(--primary-color);
        }
        
        .icon-arrow-right {
          opacity: 1;
          transform: translateX(4px);
        }
      }
    }
    
    .item-index {
      width: 32px;
      height: 32px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 20px;
      font-family: monospace;
      font-size: 16px;
    }
    
    .item-info {
      flex: 1;
      overflow: hidden;
    }
    
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.5;
      color: var(--text-main);
      margin-bottom: 8px;
      transition: color 0.3s;
    }
    
    .time {
      font-size: 13px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      
      .iconfont {
        font-size: 14px;
        margin-right: 4px;
      }
    }
    
    .icon-arrow-right {
      color: var(--text-secondary);
      opacity: 0;
      transition: all 0.3s;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .special-detail-container {
    padding: 16px;
  }
  
  .common-title {
    margin-bottom: 16px;
    
    .title {
      font-size: 20px;
    }
  }
  
  .content-wrapper {
    padding: 16px;
  }
  
  .chapter-list .item .item-link {
    padding: 16px 12px;
  }
  
  .chapter-list .item .item-index {
    margin-right: 12px;
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}
</style>
