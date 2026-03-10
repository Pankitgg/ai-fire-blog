<!--
 * @Author: Shaoli
 * @Date: 2023-02-13 22:38:30
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-02-26 16:01:47
 * @Description: 首页文章列表
-->
<template>
  <a-tabs
    v-model:activeKey="activeKey"
    class="index-tabs"
    @change="setActiveKey"
  >
    <a-tab-pane key="0" tab="最新消息"> </a-tab-pane>
    <a-tab-pane key="1" tab="一周热门"> </a-tab-pane>
    <a-tab-pane key="2" tab="排行榜"> </a-tab-pane>
  </a-tabs>
  <div
    v-infinite-scroll="load"
    :infinite-scroll-immediate="false"
    infinite-scroll-distance="10"
    class="articles-grid"
  >
    <ArticleItem
      v-for="(item, index) in state.list"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script lang="ts" setup>
import ArticleItem from '../global/ArticleItem.vue'
import request from '@/utils/request'
const activeKey = ref<string>('0')
const pageNum = ref<number>(1)
const state = reactive({
  hasMore: true,
  list: []
})
const load = async () => {
  // 如果是最新消息（0）或一周热门（1），且已经加载了数据，则不再加载更多（限制为6条）
  if (['0', '1'].includes(activeKey.value) && state.list.length >= 6) {
    state.hasMore = false
    return
  }

  if (!state.hasMore) return
  
  const pageSize = ['0', '1'].includes(activeKey.value) ? 6 : 10
  
  const { data }: any = await request.post('/blog/getBlogListByAction', {
    pageNum: pageNum.value,
    pageSize: pageSize,
    action: Number(activeKey.value)
  })
  
  pageNum.value++
  
  // 对于限制条数的tab，加载一次后就认为没有更多了
  if (['0', '1'].includes(activeKey.value)) {
    state.hasMore = false
  } else {
    state.hasMore = data?.hasMore as boolean
  }
  
  state.list = state.list.concat(data?.list || [])
}

const setActiveKey = () => {
  state.hasMore = true
  pageNum.value = 1
  state.list = []
  load()
}
load()
</script>

<style lang="less" scoped>
.index-tabs {
  :deep(.ant-tabs-tab) {
    width: 120px;
    height: 50px;
    justify-content: center;
    font-size: 19px;
    line-height: 27px;
    color: var(--text-secondary);
    &.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: var(--text-main);
      }
    }
  }
  :deep(.ant-tabs-nav) {
    margin-bottom: 20px;
  }
  :deep(.ant-tabs-ink-bar) {
    height: 3px;
    background: var(--text-main);
    border-radius: 12px;
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
}
</style>
