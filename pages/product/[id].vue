<template>
  <div class="product-detail-container" v-if="product">
    <!-- 头部区域 -->
    <div class="product-header">
      <div class="header-main">
        <div class="product-logo">
          <img v-if="product.logo" :src="product.logo" :alt="product.name" />
          <span v-else>🤖</span>
        </div>
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-intro">{{ product.intro }}</p>
          <div class="product-tags">
            <span v-for="tag in tags" :key="tag" class="tag-item">{{ tag }}</span>
          </div>
        </div>
        <div class="product-actions">
          <a :href="product.url" target="_blank" class="visit-btn primary">
            <i class="iconfont icon-link"></i> 打开站点
          </a>
          <!-- <button class="action-btn"><i class="iconfont icon-share"></i> 分享</button> -->
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="label">月访问量</div>
          <div class="value">{{ product.monthlyVisits || '-' }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏱️</div>
        <div class="stat-info">
          <div class="label">平均时长</div>
          <div class="value">{{ product.avgDuration || '-' }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-info">
          <div class="label">每次访问页数</div>
          <div class="value">{{ product.pagesPerVisit || '-' }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🚪</div>
        <div class="stat-info">
          <div class="label">跳出率</div>
          <div class="value">{{ product.bounceRate || '-' }}</div>
        </div>
      </div>
    </div>

    <div class="domain-info-card">
      <div class="info-item">
        <span class="label">域名创建</span>
        <span class="value">{{ product.domainCreated || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">域名到期</span>
        <span class="value">{{ product.domainExpiry || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">最后更改</span>
        <span class="value">{{ product.lastUpdated || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">域名年龄</span>
        <span class="value">{{ product.domainAge || '-' }}</span>
      </div>
    </div>

    <!-- 吸顶 Tab 内容区 -->
    <div class="content-tabs-wrapper" ref="tabsWrapper">
      <div class="sticky-tabs" :class="{ fixed: isSticky }">
        <div 
          v-for="tab in tabs" 
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="scrollToTab(tab.key)"
        >
          {{ tab.label }}
        </div>
      </div>

      <div class="tab-contents">
        <div id="description" class="content-section">
          <h2 class="section-title">产品介绍</h2>
          <!-- <v-md-preview :text="product.description || '暂无介绍'"></v-md-preview> -->
           <!-- <div class="article-content"> -->
          <MdPreview
          
          editor-id="preview-only"
          :model-value="product.description"
          preview-theme="default"
        /></div>
        <!-- </div> -->

        <div id="traffic" class="content-section" v-if="product.trafficInfo">
          <h2 class="section-title">网站流量</h2>
          <v-md-preview :text="product.trafficInfo"></v-md-preview>
        </div>

        <div id="opensource" class="content-section" v-if="product.openSourceInfo">
          <h2 class="section-title">同类开源产品</h2>
          <v-md-preview :text="product.openSourceInfo"></v-md-preview>
        </div>

        <div id="alternatives" class="content-section" v-if="product.alternativesInfo">
          <h2 class="section-title">替代品</h2>
          <v-md-preview :text="product.alternativesInfo"></v-md-preview>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loading-state">
    加载中...
  </div>
  <div v-else class="error-state">
    未找到该产品信息
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import request from '@/utils/request';
import { MdPreview } from 'md-editor-v3'
const route = useRoute();
const product = ref<any>(null);
const loading = ref(false);
const activeTab = ref('description');
const isSticky = ref(false);
const tabsWrapper = ref<HTMLElement | null>(null);

const tabs = computed(() => {
  const list = [{ key: 'description', label: '产品介绍' }];
  if (product.value?.trafficInfo) list.push({ key: 'traffic', label: '网站流量' });
  if (product.value?.openSourceInfo) list.push({ key: 'opensource', label: '同类开源产品' });
  if (product.value?.alternativesInfo) list.push({ key: 'alternatives', label: '替代品' });
  return list;
});

const tags = computed(() => {
  return product.value?.tags ? product.value.tags.split(/[,，]/) : [];
});

const getDetail = async () => {
  loading.value = true;
  try {
    const { data }: any = await request.post('/product/getProductDetail', {
      id: Number(route.params.id)
    });
    product.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const scrollToTab = (key: string) => {
  activeTab.value = key;
  const el = document.getElementById(key);
  if (el) {
    const offset = 80; // Header height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const handleScroll = () => {
  if (!tabsWrapper.value) return;
  const rect = tabsWrapper.value.getBoundingClientRect();
  isSticky.value = rect.top <= 60; // Adjust based on nav height

  // Update active tab based on scroll position
  for (const tab of tabs.value) {
    const el = document.getElementById(tab.key);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        activeTab.value = tab.key;
        break;
      }
    }
  }
};

onMounted(() => {
  getDetail();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>
.product-detail-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 80vh;
}

.product-header {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .header-main {
    display: flex;
    align-items: flex-start;
    gap: 24px;
  }

  .product-logo {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: #f8fafc;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 40px;
    }
  }

  .product-info {
    flex: 1;
    
    .product-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text-main);
    }
    
    .product-intro {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 16px;
    }
    
    .product-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .tag-item {
        padding: 4px 12px;
        background: #f1f5f9;
        color: #64748b;
        border-radius: 100px;
        font-size: 13px;
      }
    }
  }

  .product-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .visit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 8px;
      background: var(--primary-color);
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s;
      white-space: nowrap;
      
      &:hover {
        background: var(--primary-hover);
        transform: translateY(-2px);
      }
    }
  }
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  .stat-card {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid var(--border-color);
    
    .stat-icon {
      font-size: 24px;
      width: 48px;
      height: 48px;
      background: #f0f9ff;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .stat-info {
      .label {
        font-size: 13px;
        color: var(--text-tertiary);
        margin-bottom: 4px;
      }
      .value {
        font-size: 18px;
        font-weight: 700;
        color: var(--text-main);
      }
    }
  }
}

.domain-info-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  border: 1px solid var(--border-color);
  
  .info-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .label {
      font-size: 13px;
      color: var(--text-tertiary);
    }
    .value {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-secondary);
    }
  }
}

.sticky-tabs {
  display: flex;
  background: #fff;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
  border-radius: 12px 12px 0 0;
  
  &.fixed {
    position: fixed;
    top: 60px; // NavBar height
    left: 0;
    right: 0;
    max-width: 1000px;
    margin: 0 auto;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-radius: 0 0 12px 12px;
  }
  
  .tab-item {
    padding: 16px 24px;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    
    &:hover {
      color: var(--primary-color);
    }
    
    &.active {
      color: var(--primary-color);
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 24px;
        right: 24px;
        height: 3px;
        background: var(--primary-color);
        border-radius: 3px 3px 0 0;
      }
    }
  }
}

.content-section {
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 24px;
  scroll-margin-top: 120px;
  
  .section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    padding-left: 12px;
    border-left: 4px solid var(--primary-color);
  }
}

@media (max-width: 768px) {
  .product-header {
    .header-main {
      flex-direction: column;
    }
    .product-actions {
      width: 100%;
      flex-direction: row;
      .visit-btn {
        flex: 1;
      }
    }
  }
  
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .domain-info-card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>
