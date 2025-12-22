<template>
  <section class="hero-section">
    <div class="background-effect">
      <div v-for="n in 50" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>
    <div class="content">
      <h1 class="title">人月神话</h1>
      <h2 class="subtitle">The Mythical Man-Month</h2>
      <p class="thesis">{{ thesis }}</p>
      <div class="scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div class="line"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  thesis: string
}>()

const getParticleStyle = (n: number) => {
  const size = Math.random() * 5 + 2
  const left = Math.random() * 100
  const top = Math.random() * 100
  const duration = Math.random() * 10 + 5
  const delay = Math.random() * 5
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: Math.random() * 0.5 + 0.1
  }
}
</script>

<style scoped lang="less">
.hero-section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background: #0f172a;
  overflow: hidden;
  color: white;
}

.background-effect {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  
  .particle {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: float infinite linear;
  }
}

.content {
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  
  .title {
    font-size: 5rem;
    font-weight: 900;
    margin-bottom: 10px;
    letter-spacing: -2px;
    background: linear-gradient(to right, #fff, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeInUp 1s ease-out;
  }
  
  .subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    color: #cbd5e1;
    margin-bottom: 40px;
    font-style: italic;
    animation: fadeInUp 1s ease-out 0.2s backwards;
  }
  
  .thesis {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #94a3b8;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 20px 0;
    animation: fadeInUp 1s ease-out 0.4s backwards;
  }
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0.6;
  font-size: 0.8rem;
  letter-spacing: 3px;
  animation: fadeIn 2s ease-out 1s backwards;
  
  .line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, #fff, transparent);
  }
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 0.6; }
}
</style>