<template>
  <div class="rysh-container">
    <div class="nav-dots">
      <div 
        v-for="(comp, index) in components" 
        :key="index"
        class="dot"
        :class="{ active: currentSection === index }"
        @click="scrollToSection(index)"
      >
        <span class="tooltip">{{ comp.name }}</span>
      </div>
    </div>

    <div class="sections-wrapper" ref="wrapperRef" @scroll="handleScroll">
      <component 
        v-for="(comp, index) in components" 
        :key="index"
        :is="comp.component"
        class="section-snap"
        v-bind="comp.props"
      />
      
      <!-- Footer/Back Button -->
      <div class="final-footer section-snap">
         <div class="footer-content">
            <h2>The Mythical Man-Month</h2>
            <p>Frederick P. Brooks Jr.</p>
            <button class="back-btn" @click="router.push('/book/book')">
              Back to Library
            </button>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from './components/HeroSection.vue'
import ManMonthLaw from './components/ManMonthLaw.vue'
import SurgicalTeam from './components/SurgicalTeam.vue'
import NoSilverBullet from './components/NoSilverBullet.vue'
import RetrospectiveTimeline from './components/RetrospectiveTimeline.vue'
import bookData from './data.json'
definePageMeta({
  layout: false
})
const router = useRouter()
const wrapperRef = ref<HTMLElement | null>(null)
const currentSection = ref(0)

const components = [
  { 
    name: 'Intro', 
    component: HeroSection, 
    props: { thesis: bookData.book_metadata.primary_thesis } 
  },
  { 
    name: 'The Law', 
    component: ManMonthLaw, 
    props: {} 
  },
  { 
    name: 'The Team', 
    component: SurgicalTeam, 
    props: {} 
  },
  { 
    name: 'No Silver Bullet', 
    component: NoSilverBullet, 
    props: {} 
  },
  { 
    name: 'Retrospective', 
    component: RetrospectiveTimeline, 
    props: {} 
  }
]

const scrollToSection = (index: number) => {
  if (wrapperRef.value) {
    const height = window.innerHeight
    wrapperRef.value.scrollTo({
      top: height * index,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (wrapperRef.value) {
    const height = window.innerHeight
    const scrollTop = wrapperRef.value.scrollTop
    const index = Math.round(scrollTop / height)
    if (index !== currentSection.value && index < components.length) {
      currentSection.value = index
    }
  }
}
</script>

<style scoped lang="less">
.rysh-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.sections-wrapper {
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  
  /* Hide scrollbar */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.section-snap {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
}

.nav-dots {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255,255,255,0.5);
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    
    &:hover {
      background: rgba(255,255,255,0.8);
      .tooltip { opacity: 1; transform: translateX(-100%); }
    }
    
    &.active {
      background: #fff;
      transform: scale(1.2);
    }
    
    .tooltip {
      position: absolute;
      right: 25px;
      top: 50%;
      margin-top: -10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.3s;
      pointer-events: none;
    }
  }
}

.final-footer {
  background: #000;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .footer-content {
    text-align: center;
    h2 { font-size: 2rem; margin-bottom: 10px; }
    p { color: #888; margin-bottom: 30px; }
    
    .back-btn {
      padding: 12px 30px;
      background: #fff;
      color: #000;
      border: none;
      font-weight: bold;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.2s;
      
      &:hover { transform: scale(1.05); }
    }
  }
}
</style>