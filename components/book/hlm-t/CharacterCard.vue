<template>
  <div class="character-card-wrapper">
    <div class="character-card-inner" :class="{ flipped: mode === 'decline' }">
      <!-- Front: Prosperity/Start -->
      <div class="card-face card-front">
        <div class="avatar placeholder-avatar start">
          <span class="avatar-text">{{ character.姓名[0] }}</span>
        </div>
        <h3 class="name">{{ character.姓名 }}</h3>
        <p class="role-badge">正册</p>
        <div class="content">
          <p class="label">首次出场</p>
          <p class="text">{{ character.首次出场 }}</p>
          <p class="label">判词</p>
          <p class="text quote">{{ character.判词 }}</p>
          <div class="highlight" v-if="character.出场描写">
             <p class="label">印象</p>
             <p class="text sm">{{ character.出场描写.substring(0, 50) }}...</p>
          </div>
        </div>
      </div>

      <!-- Back: Decline/End -->
      <div class="card-face card-back">
        <div class="avatar placeholder-avatar end">
          <span class="avatar-text">{{ character.姓名[0] }}</span>
        </div>
        <h3 class="name">{{ character.姓名 }}</h3>
        <p class="role-badge danger">结局</p>
        <div class="content">
          <p class="label">最终归宿</p>
          <p class="text">{{ character.结局 }}</p>
          <p class="label">癸酉本特有</p>
          <p class="text highlight-red">{{ character.癸酉本特殊情节 }}</p>
          <p class="label">情榜</p>
          <p class="text">{{ character.情榜判词 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHlmState } from './useHlmState'

const { mode } = useHlmState()

defineProps({
  character: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.character-card-wrapper {
  background-color: transparent;
  perspective: 1000px;
  width: 100%;
  height: 450px; /* Fixed height for flip effect */
}

.character-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}

.character-card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-front {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.card-back {
  background: rgba(230, 230, 230, 0.8); /* Greyish for tragedy */
  border: 1px solid rgba(0, 0, 0, 0.1);
  transform: rotateY(180deg);
  color: #4a4a4a;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-family: 'Songti SC', serif;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.placeholder-avatar.start {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  color: #fff;
  border: 2px solid #fff;
}

.placeholder-avatar.end {
  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%);
  color: #fff;
  border: 2px solid #555;
}

.name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.role-badge {
  font-size: 0.8rem;
  padding: 0.2rem 0.8rem;
  background: rgba(0,0,0,0.05);
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

.role-badge.danger {
  background: rgba(255, 0, 0, 0.1);
  color: #c0392b;
}

.content {
  text-align: left;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.6;
  margin-bottom: 0.2rem;
}

.text {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.quote {
  font-style: italic;
  font-family: 'Songti SC', serif;
  border-left: 2px solid #d81b60;
  padding-left: 0.8rem;
}

.highlight-red {
  color: #c0392b;
  font-weight: 500;
}

.sm {
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>
