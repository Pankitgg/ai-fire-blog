<template>
  <HlmLayout>
    <div class="page-header">
      <h1>物品与诗词图鉴</h1>
      <p>物是人非事事休</p>
    </div>

    <section class="section">
      <h2>高频重点物品</h2>
      <div class="items-grid">
        <ItemCard
          v-for="item in items"
          :key="item.名称"
          :item="item"
        />
      </div>
    </section>

    <section class="section">
      <h2>经典诗词</h2>
      <PoetryCard title="葬花吟 (节选)">
        侬今葬花人笑痴，他年葬侬知是谁？
        试看春残花渐落，便是红颜老死时。
        一朝春尽红颜老，花落人亡两不知！
      </PoetryCard>
      
      <PoetryCard title="十独吟 (节选 - 癸酉本)">
        (此处为林黛玉闷作十独吟，抒发孤寂之情)
        书桌冷冷，灯火昏昏。
        风声凄凄，雨声惨惨。
      </PoetryCard>
    </section>
  </HlmLayout>
</template>

<script setup lang="ts">
import HlmLayout from '../../../../components/book/hlm-t/HlmLayout.vue'
import ItemCard from '../../../../components/book/hlm-t/ItemCard.vue'
import PoetryCard from '../../../../components/book/hlm-t/PoetryCard.vue'
import { useHlmData } from '../../../../components/book/hlm-t/useHlmData'

const { data } = useHlmData()
const items = data['高频重点物品']

definePageMeta({
  layout: false
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section {
  margin-bottom: 4rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

h2 {
  font-family: 'Songti SC', serif;
  margin-bottom: 2rem;
  border-left: 4px solid var(--primary-color, #d81b60);
  padding-left: 1rem;
}
</style>
