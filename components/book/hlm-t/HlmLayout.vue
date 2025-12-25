<template>
  <div class="hlm-container" :class="mode">
    <div class="background-layer"></div>
    
    <nav class="hlm-nav">
      <div class="nav-content">
        <div class="logo">
          <span class="logo-text">癸酉本石头记</span>
        </div>
        <div class="nav-links">
          <NuxtLink to="/book/books/hlm-t" class="nav-link">首页</NuxtLink>
          <NuxtLink to="/book/books/hlm-t/characters" class="nav-link">十二钗</NuxtLink>
          <NuxtLink to="/book/books/hlm-t/timeline" class="nav-link">演进</NuxtLink>
          <NuxtLink to="/book/books/hlm-t/analysis" class="nav-link">悼明</NuxtLink>
          <NuxtLink to="/book/books/hlm-t/gallery" class="nav-link">图鉴</NuxtLink>
        </div>
        <div class="actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <main class="hlm-main">
      <slot />
    </main>

    <footer class="hlm-footer">
      <div class="footer-content">
        <p>红楼梦 · 癸酉本石头记研究展示</p>
        <p class="small">仅供学习交流，内容基于《吴氏石头记增删试评本》</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import { useHlmState } from './useHlmState'

const { mode } = useHlmState()
</script>

<style scoped>
.hlm-container {
  min-height: 100vh;
  position: relative;
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  transition: all 1s ease;
  color: #2c3e50;
  overflow-x: hidden;
}

.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: all 1s ease;
  background-size: cover;
  background-position: center;
}

/* Prosperity Mode (Joy) */
.hlm-container.prosperity .background-layer {
  background-image: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  /* You could add a subtle pattern or image here */
  background-color: #fce4ec; /* Light pinkish */
}
.hlm-container.prosperity {
  --primary-color: #d81b60;
  --text-color: #4a235a;
  color: #4a235a;
}

/* Decline Mode (Tragedy) */
.hlm-container.decline .background-layer {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  background-color: #2c3e50;
  filter: grayscale(80%) contrast(120%);
}
.hlm-container.decline {
  --primary-color: #5d6d7e;
  --text-color: #17202a;
  color: #17202a;
}

.hlm-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 0;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.hlm-main {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.hlm-footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
}

.small {
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
