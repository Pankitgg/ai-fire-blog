<template>
  <div class="aitab-container">
    <div class="aitab-header">
      <span class="aitab-label">本站模型/工具</span>
    </div>
    <div class="aitab-grid">
      <NuxtLink v-for="item in links" :key="item.name" :to="item.url" class="aitab-item">
        <div class="item-icon">
          <svg :viewBox="item.viewBox || '0 0 24 24'" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path :d="item.path" fill="currentColor"/>
          </svg>
        </div>
        <span class="item-name">{{ item.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
  { 
    name: '智梦工作台', 
    url: '/workstation', 
    viewBox: '0 0 24 24',
    path: 'M4 6H20V18H4V6ZM6 8V16H18V8H6ZM8 10H16V12H8V10Z'
  },
  { 
    name: '知识图谱', 
    url: '/knowledge', 
    viewBox: '0 0 24 24',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  },
  { 
    name: '模型排行', 
    url: '/model-ranking', 
    viewBox: '0 0 24 24',
    path: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z'
  },
  { 
    name: '订阅对比', 
    url: '/subscribe-comparison', 
    viewBox: '0 0 24 24',
    path: 'M3 18h6v-2H3v2zm0-5h6v-2H3v2zm0-7v2h18V6H3zm18 13h-6v-2h6v2zm0-5h-6v-2h6v2z'
  }
]
</script>

<style lang="less" scoped>
.aitab-container {
  padding: 24px 20px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 30px;
}

.aitab-header {
  margin-bottom: 20px;

  .aitab-label {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
  }
}

.aitab-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: flex-start;
}

.aitab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover {
    opacity: 0.7;
  }
}

.item-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  svg {
    width: 32px;
    height: 32px;
    color: #374151;
  }
}

.item-name {
  font-size: 14px;
  color: #374151;
  text-align: center;
  white-space: nowrap;
}
</style>