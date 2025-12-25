<template>
  <HlmLayout>
    <div class="page-header">
      <h1>演进大事记</h1>
      <p>癸酉本关键章节与情节推进</p>
    </div>

    <div class="timeline-container">
      <TimelineItem
        v-for="(event, index) in events"
        :key="index"
        :chapter="'第' + event.回数 + '回'"
        :title="event.回目"
        :description="event.情节概要"
        :excerpt="event.重点摘录"
      />
      
      <EndingScene title="全书终">
        <p>好一似食尽鸟投林，落了片白茫茫大地真干净！</p>
      </EndingScene>
    </div>
  </HlmLayout>
</template>

<script setup lang="ts">
import HlmLayout from '../../../../components/book/hlm-t/HlmLayout.vue'
import TimelineItem from '../../../../components/book/hlm-t/TimelineItem.vue'
import EndingScene from '../../../../components/book/hlm-t/EndingScene.vue'
import { useHlmData } from '../../../../components/book/hlm-t/useHlmData'

const { data } = useHlmData()
const events = data['癸酉本关键章节摘录']

definePageMeta({
  layout: false
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.timeline-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
