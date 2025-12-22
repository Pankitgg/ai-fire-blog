<!--
 * @Author: Shaoli
 * @Date: 2023-02-13 23:10:31
 * @LastEditors: AI Assistant
 * @LastEditTime: 2025-07-01
 * @Description: 通用的文章卡片组件 - Redesigned
-->
<template>
  <div class="blog-card card-hover">
    <NuxtLink :to="`/detail/${props.item.id}`" class="card-link">
      <!-- 文章图片 -->
      <div class="card-image-wrapper">
        <div class="card-image" v-if="imgSrc">
          <img :src="imgSrc" :alt="props.item?.title" loading="lazy" />
        </div>
        <div class="card-image-placeholder" v-else>
          <i class="iconfont icon-article"></i>
        </div>
      </div>
      <!-- 文章内容 -->
      <div class="card-content">
        <h3 class="card-title multi-ellipsis-2">{{ props.item?.title }}</h3>
        <p class="card-intro multi-ellipsis-2">{{ props.item?.intro }}</p>
        <div class="card-footer">
          <div class="meta-item">
            <i class="iconfont icon-eye"></i>
            <span>{{ props.item?.readCount }} 阅读</span>
          </div>
          <div class="meta-item">
            <i class="iconfont icon-time"></i>
            <span>{{ TimeUtil.timeFormat(+new Date(props.item?.publishTime) / 1000) }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import TimeUtil from '@/utils/time'
const props = defineProps<{
  item: {
    title: string
    thumbnail: string
    id: number
    intro: string
    publishedCount: number
    readCount: number
    publishTime: string
  }
}>()
const imgSrc = props.item?.thumbnail ? props.item.thumbnail : ''
</script>

<style lang="less" scoped>
.blog-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
  }
  
  .card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }
  
  .card-image-wrapper {
    width: 100%;
    height: 180px;
    overflow: hidden;
    background-color: var(--bg-color);
    position: relative;
    
    .card-image {
      width: 100%;
      height: 100%;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }
    
    .card-image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      
      .iconfont {
        font-size: 48px;
        opacity: 0.3;
      }
    }
    
    .blog-card:hover & img {
      transform: scale(1.05);
    }
  }
  
  .card-content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-main);
    margin: 0 0 12px 0;
    line-height: 1.5;
    transition: color 0.2s;
    
    .blog-card:hover & {
      color: var(--primary-color);
    }
  }
  
  .card-intro {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border-color);
    padding-top: 16px;
    margin-top: auto;
    
    .meta-item {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #9CA3AF;
      
      .iconfont {
        font-size: 14px;
        margin-right: 6px;
      }
    }
  }
}
</style>
