<!--
 * @Author: Shaoli
 * @Date: 2023-02-19 21:17:04
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-23 22:04:07
 * @Description: 请填写文件描述
-->
<template>
  <div class="search-page">
    <div class="search-header" v-if="route.query.word">
      <h2>"{{ route.query.word }}" 的搜索结果</h2>
    </div>
    
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
    
    <el-empty 
      v-if="!state.list.length && !state.loading" 
      description="未找到相关文章"
    ></el-empty>
    
    <div v-if="state.list.length > 0 && !state.hasMore" class="no-more">
      - 到底啦 -
    </div>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import ArticleItem from '../components/global/ArticleItem.vue'
const route = useRoute()

watch(() => route.query.word, () => {
  pageNum.value = 1
  state.hasMore = true
  state.list = []
  load()
})

const state = reactive<Record<string, any>>({
  hasMore: true,
  list: [],
  loading: false
})
const pageNum = ref<number>(1)

const load = async () => {
  if (!state.hasMore || state.loading) return
  state.loading = true
  try {
    const { data }: any = await request.post('/blog/searchBlog', {
      pageNum: pageNum.value,
      pageSize: 10,
      word: route.query.word
    })
    pageNum.value++
    state.hasMore = data?.hasMore as boolean
    state.list = state.list.concat(data?.list || [])
  } catch (e) {
    console.error(e)
  } finally {
    state.loading = false
  }
}

// Initial load
onMounted(() => {
  if (route.query.word) {
    load()
  }
})
</script>

<style scoped lang="less">
.search-page {
  padding-bottom: 40px;
  min-height: 60vh;
}

.search-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
  
  h2 {
    font-size: 24px;
    color: var(--text-main);
    font-weight: 600;
  }
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.no-more {
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  padding: 30px 0;
}
</style>
