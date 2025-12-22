<template>
  <div class="myth-layout">
    <!-- Left: Description -->
    <div class="left-panel">
      <div class="content-box">
        <h3 class="myth-title">02 / 洞穴寓言</h3>
        <p class="myth-desc">
          你从小生活在一个洞穴里，被束缚着只能看到面前的墙壁。墙上是外界物体被火光投射的阴影，你和同伴们一生都在研究这些阴影的规律，并以此为荣。
        </p>
        <p class="myth-desc">
          有一天，你挣脱束缚，走出洞穴，看到了真实的世界和刺眼的太阳。你明白了阴影的微不足道。你会选择回到洞穴，告诉同伴们真相吗？即使你知道他们很可能不相信你，甚至因为你毁掉了他们珍视的“阴影学问”而处死你。
        </p>
        <div class="quote-box">
          <p class="quote-text">“光明是痛苦的，但值得追寻。”</p>
          <p class="quote-author">—— 柏拉图 (理想国)</p>
        </div>
      </div>
    </div>

    <!-- Right: Interaction -->
    <div class="right-panel">
      <div class="interactive-stage">
        
        <!-- Stage 1: Shadows -->
        <div v-if="stage === 'SHADOWS'" class="scene shadows-scene">
          <div class="wall-projection">
            <div class="shadow-shape s1"></div>
            <div class="shadow-shape s2"></div>
          </div>
          <p class="scene-caption">你看到的只是墙上的影子...</p>
          <button @click="breakChains" class="interact-btn">挣脱束缚</button>
        </div>

        <!-- Stage 2: Climb -->
        <div v-else-if="stage === 'CLIMB'" class="scene climb-scene">
          <div class="tunnel-light" :style="{ opacity: climbProgress / 100 }"></div>
          <p class="scene-caption">通往外界的路崎岖而刺眼</p>
          <input 
            type="range" 
            v-model="climbProgress" 
            min="0" 
            max="100" 
            class="climb-slider"
            @input="checkClimb"
          >
          <span class="progress-text">{{ climbProgress }}%</span>
        </div>

        <!-- Stage 3: Reality (Choice) -->
        <div v-else-if="stage === 'REALITY'" class="scene reality-scene">
          <div class="sun-glare"></div>
          <p class="scene-caption">你看到了真实的太阳。现在，你如何选择？</p>
          <div class="choice-row">
            <button @click="choose('RETURN')" class="choice-btn secondary">
              <span class="btn-title">返回洞穴</span>
              <span class="btn-sub">唤醒同伴 (可能面临危险)</span>
            </button>
            <button @click="choose('STAY')" class="choice-btn primary">
              <span class="btn-title">留在光明</span>
              <span class="btn-sub">享受真理 (独自一人)</span>
            </button>
          </div>
        </div>

        <!-- Stage 4: Result -->
        <div v-else class="scene result-scene">
          <div class="result-card">
            <h4>{{ finalChoice === 'RETURN' ? '殉道者之路' : '哲学家之路' }}</h4>
            <p>
              {{ finalChoice === 'RETURN'
                ? '你选择了责任。这不仅是关于看见真理，更是关于分享真理。哪怕这意味着被误解、被嘲笑甚至被毁灭。这是教育者的最高牺牲。'
                : '你选择了个人升华。真理是属于少数人的特权。你沐浴在理性的光辉中，虽然孤独，但你的灵魂是自由且清醒的。'
              }}
            </p>
            <button @click="reset" class="reset-link">重新开始</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Stage = 'SHADOWS' | 'CLIMB' | 'REALITY' | 'RESULT'

const stage = ref<Stage>('SHADOWS')
const climbProgress = ref(0)
const finalChoice = ref<string | null>(null)

const breakChains = () => {
  stage.value = 'CLIMB'
}

const checkClimb = () => {
  if (climbProgress.value >= 100) {
    setTimeout(() => {
      stage.value = 'REALITY'
    }, 500)
  }
}

const choose = (c: string) => {
  finalChoice.value = c
  stage.value = 'RESULT'
}

const reset = () => {
  stage.value = 'SHADOWS'
  climbProgress.value = 0
  finalChoice.value = null
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
    color: #e2e8f0; // Slate-200
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
  max-width: 400px;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.scene {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: fadeIn 0.5s ease;
}

.scene-caption {
  color: #a1a1aa;
  font-size: 0.9rem;
}

/* Shadows Stage */
.wall-projection {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,200,100,0.1) 0%, rgba(0,0,0,0) 70%);
  position: relative;
  border-radius: 50%;
  
  .shadow-shape {
    position: absolute;
    background: #000;
    filter: blur(4px);
    animation: shadowDance 3s infinite alternate;
    
    &.s1 {
      width: 20px; height: 40px; top: 40%; left: 30%;
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    }
    &.s2 {
      width: 25px; height: 35px; top: 45%; left: 60%;
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation-delay: 1s;
    }
  }
}

@keyframes shadowDance {
  0% { transform: scale(1) rotate(0deg); opacity: 0.7; }
  100% { transform: scale(1.1) rotate(5deg); opacity: 0.9; }
}

.interact-btn {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255,255,255,0.1);
    border-color: #fff;
  }
}

/* Climb Stage */
.tunnel-light {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 40px #fff;
  transition: opacity 0.1s;
}

.climb-slider {
  width: 80%;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255,255,255,0.5);
  }
}

.progress-text {
  font-family: monospace;
  color: #71717a;
}

/* Reality Stage */
.sun-glare {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, #fcd34d 0%, rgba(252, 211, 77, 0) 70%);
  border-radius: 50%;
  animation: pulse 4s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}

.choice-row {
  display: flex;
  gap: 16px;
  width: 100%;
  
  .choice-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background: rgba(255,255,255,0.08);
      transform: translateY(-2px);
    }
    
    .btn-title {
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
    }
    
    .btn-sub {
      font-size: 0.7rem;
      color: #71717a;
    }
  }
}

/* Result Stage */
.result-card {
  text-align: center;
  
  h4 {
    color: #fff;
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>