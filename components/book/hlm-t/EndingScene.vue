<template>
  <div class="ending-scene">
    <h2>{{ title }}</h2>
    <div class="scene-text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '终局'
  }
})
</script>

<style scoped>
.ending-scene {
  background: #000;
  color: #fff;
  padding: 3rem;
  text-align: center;
  border-radius: 16px;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
}

.ending-scene::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%);
  pointer-events: none;
}

h2 {
  font-family: 'Songti SC', serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #e74c3c;
}

.scene-text {
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
}
</style>
