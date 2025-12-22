<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1>技术专栏</h1>
      <p>分享AI技术心得与开发经验</p>
    </div>

    <BlogTypes
      :type-list="state.typeList"
      :active-type="state.cateId"
      @change-active-type="changeActiveType"
    />
    <div
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
      :infinite-scroll-distance="20"
      class="article-grid"
    >
      <ArticleItem
        v-for="(item, index) in state.list"
        :key="index"
        :item="item"
      />
    </div>
    <el-empty v-if="!state.list.length" description="暂无数据" class="empty-state"></el-empty>
    <div v-if="state.list.length > 0 && !state.hasMore" class="no-more">
      - 到底啦 -
    </div>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
const getTypeList = async () => {
  const { data }: any = await request.post('/blog/getCateList')
  state.cateId = data ? data[0].id : null
  state.typeList = data || []
  load()
}

const changeActiveType = (v: number) => {
  state.cateId = v
  pageNum.value = 1
  state.list = []
  state.hasMore = true
  load()
}

const state = reactive<Record<string, any>>({
  hasMore: true,
  cateId: null,
  list: [],
  typeList: []
})
const pageNum = ref<number>(1)
const load = async () => {
  if (state.cateId == null) return
  if (!state.hasMore) return
  const { data }: any = await request.post('/blog/getCateBlogList', {
    pageNum: pageNum.value,
    pageSize: 10,
    cateId: state.cateId
  })
  pageNum.value++
  state.hasMore = data?.hasMore as boolean
  state.list = state.list.concat(data?.list || [])
}
getTypeList()
</script>

<style scoped lang="less">
.blog-container {
  padding-bottom: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.blog-header {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: var(--radius-xl);
  margin-bottom: 40px;
  
  h1 {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 18px;
    color: var(--text-secondary);
  }
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 0 0 20px 0;
}

.empty-state {
  margin-top: 40px;
}

.no-more {
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .blog-header {
    padding: 40px 20px;
    
    h1 {
      font-size: 28px;
    }
    
    p {
      font-size: 16px;
    }
  }
  
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
