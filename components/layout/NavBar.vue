<!--
 * @Author: Shaoli
 * @Date: 2023-02-11 21:53:10
 * @LastEditors: AI Assistant
 * @LastEditTime: 2025-07-01
 * @Description: 头部导航栏 - Redesigned
-->
<template>
  <div class="nav-bar visible">
    <div class="nav-content-box">
      <NuxtLink class="home-link" to="/">
        <div class="header">
          <img :src="headerSrc" class="logo" />
          <span class="nav-title">
            {{ userInfo?.nicker || 'AI Fire' }}
          </span>
        </div>
      </NuxtLink>
      
      <div class="nav-search-wrapper">
        <a-input
          v-model:value="searchVal"
          class="search-input"
          placeholder="探索感兴趣的内容..."
          allow-clear
          @keyup.enter="jumpSearch"
        >
          <template #prefix>
            <i class="iconfont icon-search" />
          </template>
        </a-input>
      </div>
      
      <div class="nav-right">
        <!-- 这里可以添加右侧功能区，如主题切换等 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import request from '@/utils/request'
const searchVal = ref<string>('')
const router = useRouter()
const jumpSearch = () => {
  if (!searchVal.value.trim()) return
  router.push({
    path: '/search',
    query: {
      word: searchVal.value
    }
  })
}

// 使用 useState 在服务端和客户端之间共享数据，避免水合不匹配
const userInfo = useState('navUserInfo', () => ({
  job: '',
  intro: '',
  email: '',
  wechat: '',
  slogan: '',
  rewardCode: '',
  avatar: '',
  nicker: 'AI Fire'
}))

// 只在客户端或首次加载时获取数据
onMounted(async () => {
  try {
    const { data }: any = await request.post('/site/getWebmasterInfo')
    if (data) {
      userInfo.value = data
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})

const headerSrc = computed(() => {
  return userInfo.value?.avatar || '/favicon.ico'
})
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: relative;
  transition: all 0.3s ease;
  
  &.visible {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    box-shadow: var(--shadow-sm);
  }
  
  .nav-content-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .home-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logo {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      object-fit: cover;
    }
    
    .nav-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-main);
      white-space: nowrap;
    }
  }

  .nav-search-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    max-width: 600px;
    margin: 0 20px;
  }

  .search-input {
    width: 100%;
    max-width: 500px;
    height: 40px;
    background: var(--bg-secondary);
    border: 1px solid transparent;
    border-radius: 20px;
    padding: 4px 12px;
    transition: all 0.3s;
    
    &:hover, &:focus-within {
      background: #fff;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }
    
    :deep(.ant-input) {
      background: transparent;
      padding-left: 8px;
      font-size: 14px;
      color: var(--text-main);
      
      &::placeholder {
        color: var(--text-secondary);
      }
    }
    
    :deep(.anticon) {
      color: var(--text-secondary);
      font-size: 16px;
    }
  }
  
  .nav-right {
    min-width: 40px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .nav-bar {
    .nav-content-box {
      padding: 0 16px;
    }
    
    .nav-title {
      display: none;
    }
    
    .nav-search-wrapper {
      margin-left: auto;
      margin-right: 0;
      justify-content: flex-end;
    }
    
    .search-input {
      max-width: 200px;
    }
  }
}
</style>
