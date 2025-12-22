<template>
  <div class="special-detail-container">
    <div class="detail-header">
      <div class="common-title">
        <div class="back-btn" @click="goback">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="title">文章详情</div>
        <div class="menu-btn" @click="showDrawer">
          <i class="iconfont icon-menu"></i>
        </div>
      </div>
      
      <div class="article-info">
        <h1 class="preview-title">{{ state.title }}</h1>
        <div class="preview-meta">
          <span class="time">
            <i class="iconfont icon-time"></i>
            {{ dayjs(state.time).format('YYYY-MM-DD HH:mm') }}
          </span>
          <span class="read-count">
            <i class="iconfont icon-eye"></i>
            阅读: {{ state.readCount }}
          </span>
        </div>
      </div>
    </div>

    <div class="article-content">
      <MdPreview
        editor-id="preview-only"
        :model-value="state.content"
        preview-theme="default"
        class="md-preview"
      />
    </div>
    
    <el-drawer 
      v-model="state.drawer" 
      :show-close="false" 
      size="80%" 
      direction="rtl"
      class="special-drawer"
    >
      <SpecialNav />
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import SpecialNav from '@/components/special/specialNav.vue'
import request from '@/utils/request'
import { useCommon } from '@/stores/index'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

definePageMeta({
  layout: 'special-detail-layout'
})
const commonStore = useCommon()
const router = useRouter()
const route = useRoute()
const goback = () => {
  router.go(-1)
}

watch(route, () => {
  getDetail()
})

const state = reactive({
  content: '',
  time: '',
  title: '',
  drawer: false,
  readCount: 0
})

const showDrawer = () => {
  state.drawer = true
}
const getDetail = async () => {
  try {
    const { data }: any = await request.post('/special/getSectionDetail', {
      sectionId: Number(route.query.id)
    })
    commonStore.setCurrentSectionId(route.query.id as string)
    state.content = data?.content || ''
    state.title = data?.title || ''
    state.time = data?.updateTime || ''
    state.readCount = data?.readCount || 0
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}
getDetail()
</script>

<style lang="less" scoped>
.special-detail-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.detail-header {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  .back-btn, .menu-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
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
    font-size: 16px;
    color: var(--text-secondary);
  }
  
  .menu-btn {
    display: none; // 默认隐藏，小屏幕显示
  }
}

.article-info {
  .preview-title {
    font-size: 32px;
    font-weight: bold;
    color: var(--text-main);
    margin-bottom: 16px;
    line-height: 1.4;
  }
  
  .preview-meta {
    display: flex;
    align-items: center;
    color: var(--text-secondary);
    font-size: 14px;
    
    span {
      display: flex;
      align-items: center;
      margin-right: 20px;
      
      .iconfont {
        margin-right: 6px;
        font-size: 16px;
      }
    }
  }
}

.article-content {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  min-height: 400px;
  
  :deep(.md-editor-preview-wrapper) {
    padding: 0;
  }
}

// 响应式设计
@media (max-width: 816px) {
  .common-title .menu-btn {
    display: flex;
  }
  
  .article-info .preview-title {
    font-size: 24px;
  }
  
  .article-content {
    padding: 16px;
  }
}

@media (min-width: 816px) {
  // 大屏幕下隐藏抽屉按钮，因为侧边栏可能已经显示（取决于 layout）
  // 这里假设 special-detail-layout 会处理侧边栏
}
</style>
