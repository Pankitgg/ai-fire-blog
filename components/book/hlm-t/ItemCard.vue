<template>
  <GlassCard class="item-card" :hover="true">
    <div class="icon-wrapper">
      📦
    </div>
    <div class="content">
      <h3>{{ item.名称 }}</h3>
      <p class="desc">{{ item.描述 }}</p>
      <div class="meta">
        <strong>象征意义:</strong> {{ item.象征意义 }}
      </div>
    </div>
  </GlassCard>
</template>

<script setup lang="ts">
import GlassCard from './GlassCard.vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.item-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  height: 100%;
}

.icon-wrapper {
  font-size: 2.5rem;
  background: rgba(255,255,255,0.5);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.content h3 {
  margin: 0 0 0.5rem 0;
}

.desc {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.meta {
  font-size: 0.8rem;
  background: rgba(0,0,0,0.05);
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
