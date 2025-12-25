<template>
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <div class="time-header">
        <span class="chapter-badge">{{ chapter }}</span>
        <span class="chapter-title">{{ title }}</span>
      </div>
      <GlassCard class="content-card">
        <div class="event-desc">{{ description }}</div>
        <div class="excerpt" v-if="excerpt">
           <span class="quote-mark">“</span>
           {{ excerpt }}
           <span class="quote-mark">”</span>
        </div>
      </GlassCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassCard from './GlassCard.vue'

defineProps({
  chapter: String,
  title: String,
  description: String,
  excerpt: String
})
</script>

<style scoped>
.timeline-item {
  position: relative;
  padding-left: 2rem;
  padding-bottom: 3rem;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}

.timeline-item:last-child {
  border-left: 2px solid transparent;
}

.timeline-dot {
  position: absolute;
  left: -9px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-color, #d81b60);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
}

.time-header {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chapter-badge {
  background: #2c3e50;
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.chapter-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.event-desc {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.excerpt {
  font-family: 'Songti SC', serif;
  font-style: italic;
  color: #555;
  background: rgba(255,255,255,0.3);
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}

.quote-mark {
  font-size: 1.5rem;
  color: var(--primary-color, #d81b60);
  opacity: 0.5;
  vertical-align: sub;
}
</style>
