<template>
  <div class="myth-layout">
    <!-- Left: Description -->
    <div class="left-panel">
      <div class="content-box">
        <h3 class="myth-title">01 / 忒修斯之船</h3>
        <p class="myth-desc">
          有一艘名为“忒修斯”的木船，随着时间推移，每一块木板逐渐被替换，直到所有零件都不是最初的。
        </p>
        <p class="myth-desc">
          问：最终这艘船还是原“忒修斯之船”吗？如果将被替换下来的旧木板重新组装成船，哪一艘才是真正的“忒修斯之船”？
        </p>
        <div class="quote-box">
          <p class="quote-text">“人不能两次踏进同一条河流。”</p>
          <p class="quote-author">—— 赫拉克利特</p>
        </div>
      </div>
    </div>

    <!-- Right: Interaction -->
    <div class="right-panel">
      <div class="interactive-stage">
        <div class="ship-visual">
          <svg viewBox="0 0 300 160" class="ship-svg">
            <defs>
              <linearGradient id="grad-original" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#8B4513"/>
                <stop offset="100%" stop-color="#5D4037"/>
              </linearGradient>
              <linearGradient id="grad-new" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FCD34D"/>
                <stop offset="100%" stop-color="#F59E0B"/>
              </linearGradient>
            </defs>
            
            <!-- Water -->
            <path d="M0,140 Q75,130 150,140 T300,140 V160 H0 Z" fill="#3b82f6" opacity="0.3">
              <animate attributeName="d" values="M0,140 Q75,130 150,140 T300,140 V160 H0 Z;M0,140 Q75,150 150,140 T300,140 V160 H0 Z;M0,140 Q75,130 150,140 T300,140 V160 H0 Z" dur="4s" repeatCount="indefinite" />
            </path>

            <!-- Ship Parts -->
            <g v-for="(part, index) in parts" :key="index" 
               @click="replacePart(index)" 
               class="ship-part-group"
               :class="{ 'clickable': !part.isNew && !choice, 'is-new': part.isNew }"
            >
              <path :d="part.path" 
                    :fill="part.isNew ? 'url(#grad-new)' : 'url(#grad-original)'" 
                    stroke="rgba(0,0,0,0.2)"
                    stroke-width="0.5"
                    class="part-shape" 
              />
            </g>
          </svg>
          
          <div class="status-indicator">
            <div class="status-item">
              <span>原始部件</span>
              <div class="progress-bar">
                <div class="fill original" :style="{ width: originality + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="controls-area">
          <div v-if="!choice" class="action-stage">
            <p v-if="originality > 0" class="instruction">点击船体部件进行替换</p>
            <div v-else class="choice-buttons">
              <p class="instruction">所有的部件都已更换...</p>
              <div class="btn-row">
                <button @click="makeChoice('renovated')" class="choice-btn">是原船 (形式延续)</button>
                <button @click="makeChoice('original')" class="choice-btn">是新船 (物质同一)</button>
              </div>
            </div>
          </div>

          <div v-else class="result-stage">
            <div class="result-card">
              <h4>{{ choice === 'renovated' ? '你的选择：形式延续' : '你的选择：物质同一' }}</h4>
              <p>
                {{ choice === 'renovated' 
                  ? '你认为“身份”在于结构与历史的连续性，而非物质本身。就像你的身体细胞不断更新，但你依然是你。' 
                  : '你认为“身份”由物质构成决定。一旦物质改变，物体即不再是原来的它。这是一种严格的唯物主义视角。' 
                }}
              </p>
              <button @click="reset" class="reset-link">重置实验</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface ShipPart {
  id: number
  path: string
  isNew: boolean
}

const parts = ref<ShipPart[]>([
  { id: 0, path: 'M20,110 Q80,150 140,130 L130,110 Z', isNew: false }, // Left Hull
  { id: 1, path: 'M140,130 Q220,150 280,110 L270,100 L130,110 Z', isNew: false }, // Right Hull
  { id: 2, path: 'M145,40 L155,40 L155,110 L145,110 Z', isNew: false }, // Mast
  { id: 3, path: 'M155,45 Q220,70 155,100 Z', isNew: false }, // Sail
  { id: 4, path: 'M30,110 L270,100 L275,95 L25,105 Z', isNew: false } // Deck
])

const choice = ref<string | null>(null)

const originality = computed(() => {
  const originalCount = parts.value.filter(p => !p.isNew).length
  return Math.round((originalCount / parts.value.length) * 100)
})

const replacePart = (index: number) => {
  if (!parts.value[index].isNew && !choice.value) {
    parts.value[index].isNew = true
  }
}

const makeChoice = (c: string) => {
  choice.value = c
}

const reset = () => {
  parts.value.forEach(p => p.isNew = false)
  choice.value = null
}
</script>

<style scoped lang="less">
.myth-layout {
  display: flex;
  min-height: 360px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.left-panel {
  flex: 1;
  padding: 40px;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 30px;
  }
}

.content-box {
  .myth-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #f59e0b; // Amber-500
    letter-spacing: 1px;
    margin-bottom: 16px;
    text-transform: uppercase;
  }
  
  .myth-desc {
    color: #e4e4e7;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 16px;
    font-weight: 300;
  }
  
  .quote-box {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
    
    .quote-text {
      font-family: serif;
      font-style: italic;
      color: #a1a1aa;
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
    
    .quote-author {
      color: #71717a;
      font-size: 0.85rem;
      text-align: right;
    }
  }
}

.right-panel {
  flex: 1.2;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.1);
}

.interactive-stage {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ship-visual {
  position: relative;
  
  .ship-svg {
    width: 100%;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
  }
}

.ship-part-group {
  transition: transform 0.3s ease;
  
  &.clickable {
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
      transform: translateY(-2px);
    }
  }
  
  &.is-new {
    animation: flash 0.5s ease;
  }
}

@keyframes flash {
  0% { filter: brightness(2); }
  100% { filter: brightness(1); }
}

.status-indicator {
  margin-top: 10px;
  .status-item {
    display: flex;
    align-items: center;
    gap: 10px;
    
    span {
      font-size: 0.75rem;
      color: #71717a;
      width: 50px;
    }
    
    .progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
      
      .fill {
        height: 100%;
        background: #f59e0b;
        transition: width 0.5s ease;
      }
    }
  }
}

.controls-area {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.instruction {
  color: #a1a1aa;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 16px;
}

.btn-row {
  display: flex;
  gap: 12px;
  
  .choice-btn {
    flex: 1;
    padding: 10px 16px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: #e4e4e7;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: rgba(255,255,255,0.1);
      border-color: #f59e0b;
      color: #f59e0b;
    }
  }
}

.result-card {
  text-align: center;
  animation: slideUp 0.4s ease;
  
  h4 {
    color: #f59e0b;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }
  
  p {
    color: #d4d4d8;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
  
  .reset-link {
    background: none;
    border: none;
    color: #71717a;
    font-size: 0.8rem;
    cursor: pointer;
    text-decoration: underline;
    
    &:hover { color: #e4e4e7; }
  }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>