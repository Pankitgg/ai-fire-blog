<template>
  <button class="theme-toggle" @click="toggleMode" :title="mode === 'prosperity' ? '切换至结局' : '切换至开篇'">
    <span v-if="mode === 'prosperity'" class="icon">🌸 盛</span>
    <span v-else class="icon">❄️ 衰</span>
  </button>
</template>

<script setup lang="ts">
import { useHlmState } from './useHlmState'

const { mode, toggleMode } = useHlmState()
</script>

<style scoped>
.theme-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}
</style>
