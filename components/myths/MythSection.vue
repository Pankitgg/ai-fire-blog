<template>
  <section class="myths-section">
    <div class="section-container">
      <div class="myth-display-area">
        <div class="refresh-container">
          <button @click="refreshMyth" class="refresh-btn" title="切换迷思">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
            </svg>
            <span>切换</span>
          </button>
        </div>
        <Transition name="myth-fade" mode="out-in">
          <component :is="currentMythComponent" :key="currentMythIndex" />
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ShipOfTheseus from './ShipOfTheseus.vue'
import PlatosCave from './PlatosCave.vue'
import ExperienceMachine from './ExperienceMachine.vue'

const myths = [ShipOfTheseus, PlatosCave, ExperienceMachine]
const mythColors = ['#e6ccb2', '#2c3e50', '#b19cd9'] // Example colors: Ship (Beige/Wood), Cave (Dark Blue/Grey), Machine (Purple)
// Better colors might be:
// Ship: #f5e6d3 (Warm parchment) or #e0f2fe (Light sky blue)
// Cave: #1f2937 (Dark slate) or #fff7ed (Orange tint for fire?) -> The user wants background of the SECTION.
// Machine: #f3e8ff (Light purple)

// Let's go with softer backgrounds that fit the page:
// Ship: #fff7ed (Orange-50 - Warm)
// Cave: #f8fafc (Slate-50 - Cool/Neutral) - actually maybe darker? But the text needs to be readable.
// Machine: #f0f9ff (Sky-50 - Tech)

// Wait, the user's current background is #65b82e (Green).
// Let's pick nice pastel colors that fit the "High-end" feel.
const mythThemes = [
  { component: ShipOfTheseus, color: '#0f172a' }, // Deep Slate (Ship/Ocean)
  { component: PlatosCave, color: '#18181b' },    // Zinc Black (Cave/Shadows)
  { component: ExperienceMachine, color: '#312e81' } // Deep Indigo (Machine/Dream)
]

const currentMythIndex = ref(0)
const emit = defineEmits(['update:color'])

const currentMythComponent = computed(() => {
  return mythThemes[currentMythIndex.value].component
})

const updateColor = () => {
   emit('update:color', mythThemes[currentMythIndex.value].color)
}

const refreshMyth = () => {
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * myths.length)
  } while (newIndex === currentMythIndex.value && myths.length > 1)
  
  currentMythIndex.value = newIndex
  updateColor()
}

onMounted(() => {
  currentMythIndex.value = Math.floor(Math.random() * myths.length)
  updateColor()
})
</script>

<style scoped lang="less">
.myths-section {
  padding: 40px 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px; /* Adjust as needed to match other modules */
}

.section-container {
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
}

.myth-display-area {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.12);
  }
}

.refresh-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a1a1aa;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #e4e4e7;
    
    svg {
      transform: rotate(180deg);
    }
  }
  
  svg {
    transition: transform 0.5s ease;
  }
}

/* Transitions */
.myth-fade-enter-active,
.myth-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.myth-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.myth-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>