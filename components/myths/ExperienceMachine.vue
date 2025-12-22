<template>
  <div class="myth-layout">
    <!-- Left: Description -->
    <div class="left-panel">
      <div class="content-box">
        <h3 class="myth-title">03 / 体验之盒</h3>
        <p class="myth-desc">
          假设有一个“终极体验盒”，连接后能让你体验任何你能想象到的人生：伟大的科学家、不朽的艺术家、被深爱的伴侣……
        </p>
        <p class="myth-desc">
          所有体验都100%真实，且充满持续的幸福感。一旦进入，你会忘记盒子存在，并认为是真实人生。你会选择进入盒子，度过这“幸福”的一生吗？
        </p>
        <div class="quote-box">
          <p class="quote-text">“除了此时此刻的感受之外，还有什么对我们重要呢？”</p>
          <p class="quote-author">—— 罗伯特·诺齐克</p>
        </div>
      </div>
    </div>

    <!-- Right: Interaction -->
    <div class="right-panel">
      <div class="interactive-stage">
        
        <div v-if="!choice" class="machine-interface">
          <!-- Screen -->
          <div class="machine-screen">
            <div class="screen-overlay" :style="{ opacity: intensity / 100 }">
              <div class="dream-words">
                <span>LOVE</span>
                <span>GLORY</span>
                <span>JOY</span>
              </div>
            </div>
            <div class="base-reality" :style="{ opacity: 1 - intensity / 100 }">
              <div class="grid-lines"></div>
              <span class="reality-label">REALITY</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="controls-wrapper">
            <div class="slider-group">
              <label>体验强度</label>
              <input 
                type="range" 
                v-model="intensity" 
                min="0" 
                max="100" 
                class="intensity-slider"
              >
            </div>
            
            <p class="prompt-text">
              {{ intensity > 50 ? '准备进入完美模拟...' : '保持清醒的现实...' }}
            </p>

            <div class="action-buttons">
              <button 
                @click="makeChoice('ENTER')" 
                class="action-btn enter-btn"
                :disabled="intensity < 80"
              >
                接入盒子
              </button>
              <button 
                @click="makeChoice('REJECT')" 
                class="action-btn reject-btn"
                :disabled="intensity > 20"
              >
                拒绝接入
              </button>
            </div>
          </div>
        </div>

        <div v-else class="result-display">
          <div class="result-card">
            <h4>{{ choice === 'ENTER' ? '享乐主义者' : '本真性的守护者' }}</h4>
            <p>
              {{ choice === 'ENTER'
                ? '你选择了快乐。对于你来说，主观体验的质量至高无上。如果感觉是真实的，那么它就是真实的。你将度过完美的一生，虽然那只是电信号的刺激。'
                : '你选择了真实。你认为“做”某事比仅仅“感觉”到做某事更重要。你愿意承担痛苦和失败，只要那是你自己真实的人生，而不是被编程的幻梦。'
              }}
            </p>
            <button @click="reset" class="reset-link">断开连接 / 重置</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const intensity = ref(50)
const choice = ref<string | null>(null)

const makeChoice = (c: string) => {
  choice.value = c
}

const reset = () => {
  intensity.value = 50
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
    color: #ec4899; // Pink-500
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
  background: rgba(0,0,0,0.2);
}

.interactive-stage {
  width: 100%;
  max-width: 360px;
}

.machine-interface {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.machine-screen {
  height: 140px;
  background: #000;
  border-radius: 12px;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
}

.screen-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #be185d, #4c1d95);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .dream-words {
    font-weight: 900;
    color: rgba(255,255,255,0.5);
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    filter: blur(0.5px);
  }
}

.base-reality {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #18181b;
  
  .reality-label {
    font-family: monospace;
    color: #52525b;
    letter-spacing: 2px;
  }
  
  .grid-lines {
    position: absolute;
    width: 200%; height: 200%;
    background-image: linear-gradient(#27272a 1px, transparent 1px),
                      linear-gradient(90deg, #27272a 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
  }
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 0.75rem;
    color: #a1a1aa;
    text-transform: uppercase;
  }
}

.intensity-slider {
  width: 100%;
  height: 6px;
  background: #333;
  border-radius: 3px;
  -webkit-appearance: none;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: #ec4899;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
    transition: transform 0.2s;
    
    &:hover { transform: scale(1.1); }
  }
}

.prompt-text {
  text-align: center;
  font-size: 0.8rem;
  color: #ec4899;
  min-height: 1.2em;
}

.action-buttons {
  display: flex;
  gap: 12px;
  
  .action-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
    
    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
    
    &.enter-btn {
      background: #ec4899;
      color: #fff;
      &:hover:not(:disabled) { background: #db2777; box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
    }
    
    &.reject-btn {
      background: #3f3f46;
      color: #fff;
      &:hover:not(:disabled) { background: #52525b; }
    }
  }
}

.result-card {
  text-align: center;
  animation: scaleIn 0.4s ease;
  
  h4 {
    color: #ec4899;
    font-size: 1.2rem;
    margin-bottom: 16px;
  }
  
  p {
    color: #d4d4d8;
    line-height: 1.6;
    margin-bottom: 24px;
    font-size: 0.95rem;
  }
  
  .reset-link {
    background: none;
    border: none;
    color: #71717a;
    cursor: pointer;
    text-decoration: underline;
    &:hover { color: #fff; }
  }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>