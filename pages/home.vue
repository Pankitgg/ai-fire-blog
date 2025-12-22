<!--
 * @Author: Shaoli
 * @Date: 2023-01-08 22:35:28
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-26 22:30:00
 * @Description: 首页 - AI资讯和工具汇总
-->
<template>
  <div class="home-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>AI资讯与工具平台</h1>
      <p>探索最新的AI技术资讯和实用工具</p>
    </div>
    
    <!-- AI资讯板块 -->
    <AiNews />
    
    <!-- 最新文章板块 -->
    <div class="latest-articles-section">
      <div class="section-header">
        <h2>最新文章</h2>
        <a href="/blog" class="more-link">查看更多</a>
      </div>
      <ArticleList />
    </div>
    
    <!-- AI工具汇总板块 -->
    <AiTools />
  </div>
</template>

<script lang="ts" setup>
// 导入组件
import ArticleList from '@/components/index/ArticleList.vue'
import AiNews from '@/components/index/AiNews.vue'
import AiTools from '@/components/index/AiTools.vue'
</script>

<style lang="less" scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin: 40px 0;
  padding: 0 20px;
  
  h1 {
    font-size: 36px;
    font-weight: 700;
    color: var(--text-main);
    margin: 0 0 12px 0;
  }
  
  p {
    font-size: 18px;
    color: var(--text-secondary);
    margin: 0;
  }
}

.latest-articles-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-main);
    margin: 0;
  }
  
  .more-link {
    font-size: 14px;
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: var(--primary-hover);
    }
  }
}

@media (max-width: 768px) {
  .page-header {
    margin: 30px 0;
    
    h1 {
      font-size: 28px;
    }
    
    p {
      font-size: 16px;
    }
  }
}
</style>
