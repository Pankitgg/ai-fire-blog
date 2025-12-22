<!-- AI产品库页面 -->
<template>
  <div class="ai-product-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">AI产品库</h1>
      <p class="page-description">精选全球优质AI工具，涵盖写作、绘画、编程、视频等多个领域</p>
    </div>

    <!-- 分类导航 -->
    <div class="category-nav">
      <div 
        v-for="category in aiCategories" 
        :key="category.id"
        class="category-item"
        :class="{ active: selectedCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        <div class="category-icon">{{ category.icon || '💡' }}</div>
        <div class="category-info">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-desc">{{ category.description }}</p>
        </div>
      </div>
    </div>

    <!-- 工具列表 -->
    <div class="tools-container">
      <div 
        v-for="tool in filteredTools" 
        :key="tool.id"
        class="tool-card"
      >
        <a :href="tool.url" target="_blank" class="tool-link">
          <div class="tool-header">
            <div class="tool-logo">{{ tool.logo || '🤖' }}</div>
            <div class="tool-rating" v-if="tool.rating">
              <span class="rating-star">⭐</span>
              <span class="rating-score">{{ tool.rating }}</span>
            </div>
          </div>
          <div class="tool-content">
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-description">{{ tool.description }}</p>
            <div class="tool-tags">
              <span 
                v-for="tag in tool.tags" 
                :key="tag"
                class="tool-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="tool-footer">
            <span class="visit-btn">立即访问</span>
            <i class="iconfont icon-link"></i>
          </div>
        </a>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredTools.length === 0" class="empty-state">
      <i class="iconfont icon-empty"></i>
      <p>暂无相关AI工具</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { aiCategories, aiTools, AiTool, AiCategory } from './aidata';

// 状态管理
const selectedCategory = ref<string>('all');

// 过滤工具列表
const filteredTools = computed(() => {
  if (selectedCategory.value === 'all') {
    return aiTools;
  }
  return aiTools.filter(tool => tool.category === selectedCategory.value);
});

// 选择分类
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};
</script>

<style lang="less" scoped>
.ai-product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 60px);
}

.page-header {
  text-align: center;
  margin-bottom: 60px;

  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 16px;
  }

  .page-description {
    font-size: 18px;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 40px;
  padding: 24px;
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  justify-content: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &.active {
    border-color: var(--primary-color);
    background: rgba(16, 185, 129, 0.05);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
    
    .category-name {
      color: var(--primary-color);
    }
  }
}

.category-icon {
  font-size: 24px;
}

.category-info {
  flex: 1;
  overflow: hidden;

  .category-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 4px;
    transition: color 0.3s;
  }

  .category-desc {
    font-size: 12px;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.tools-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.tool-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
    
    .tool-footer .iconfont {
      color: var(--primary-color);
    }
  }
}

.tool-link {
  display: block;
  padding: 24px;
  color: inherit;
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.tool-logo {
  font-size: 32px;
  margin-right: 12px;
}

.tool-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #f59e0b;

  .rating-star {
    font-size: 16px;
  }

  .rating-score {
    font-weight: 600;
  }
}

.tool-content {
  margin-bottom: 20px;
  flex: 1;
}

.tool-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
  line-height: 1.3;
}

.tool-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-tag {
  padding: 4px 12px;
  background: var(--bg-secondary);
  border-radius: 12px;
  font-size: 12px;
  color: var(--text-secondary);
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  margin-top: auto;

  .visit-btn {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color);
  }

  .iconfont {
    font-size: 16px;
    color: var(--text-secondary);
    transition: color 0.3s;
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
  font-size: 16px;
  
  .iconfont {
    font-size: 64px;
    margin-bottom: 16px;
    display: block;
    color: var(--border-color);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-product-container {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 28px !important;
  }

  .page-description {
    font-size: 16px !important;
  }

  .category-nav {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }

  .category-item {
    min-width: auto;
  }

  .category-info .category-desc {
    white-space: normal;
  }

  .tools-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .tool-card {
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px !important;
  }

  .page-description {
    font-size: 14px !important;
  }

  .tool-link {
    padding: 20px;
  }

  .tool-name {
    font-size: 18px;
  }
}
</style>