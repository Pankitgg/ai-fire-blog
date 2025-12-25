<template>
  <div class="poetry-card">
    <h3 class="title">{{ title }}</h3>
    <div class="poetry-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String
})
</script>

<style scoped>
.poetry-card {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 250, 240, 0.6); /* Parchment-like */
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
  font-family: 'Songti SC', serif;
  margin-bottom: 2rem;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: #8e44ad;
}

.poetry-content {
  white-space: pre-line;
  line-height: 2;
  font-size: 1.1rem;
}
</style>
