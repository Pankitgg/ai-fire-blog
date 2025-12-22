<template>
  <section class="man-month-section">
    <div class="split-layout">
      <div class="text-col">
        <h2>人月神话的数学陷阱</h2>
        <div class="formula-box">
          <div class="formula">Communication = n(n-1)/2</div>
        </div>
        <p class="desc">
          "Adding manpower to a late software project makes it later."
        </p>
        <p class="detail">
          当团队规模(N)线性增长时，沟通成本呈指数级(N²)增长。
          <br>拖动滑块体验沟通路径的爆炸式增长。
        </p>
        
        <div class="controls">
          <label>Team Size: {{ teamSize }}</label>
          <input 
            type="range" 
            min="2" 
            max="12" 
            v-model.number="teamSize" 
            class="slider"
          >
          <div class="stats">
            <div class="stat-item">
              <span class="val">{{ teamSize }}</span>
              <span class="lbl">People</span>
            </div>
            <div class="stat-item highlight">
              <span class="val">{{ connections }}</span>
              <span class="lbl">Links</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="vis-col">
        <div class="network-vis">
          <svg viewBox="0 0 400 400" class="connections-svg">
             <!-- Links -->
             <line 
               v-for="(link, i) in links" 
               :key="`link-${i}`"
               :x1="link.x1" 
               :y1="link.y1" 
               :x2="link.x2" 
               :y2="link.y2" 
               stroke="rgba(239, 68, 68, 0.4)" 
               stroke-width="1"
             />
             <!-- Nodes -->
             <circle 
               v-for="(node, i) in nodes" 
               :key="`node-${i}`"
               :cx="node.x" 
               :cy="node.y" 
               r="8" 
               fill="#38bdf8"
               stroke="#0f172a"
               stroke-width="2"
             />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const teamSize = ref(3)

const connections = computed(() => {
  const n = teamSize.value
  return (n * (n - 1)) / 2
})

const nodes = computed(() => {
  const n = teamSize.value
  const arr = []
  const cx = 200
  const cy = 200
  const r = 140
  
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2
    arr.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r
    })
  }
  return arr
})

const links = computed(() => {
  const nodeList = nodes.value
  const linkArr = []
  for (let i = 0; i < nodeList.length; i++) {
    for (let j = i + 1; j < nodeList.length; j++) {
      linkArr.push({
        x1: nodeList[i].x,
        y1: nodeList[i].y,
        x2: nodeList[j].x,
        y2: nodeList[j].y
      })
    }
  }
  return linkArr
})
</script>

<style scoped lang="less">
.man-month-section {
  min-height: 100vh;
  background: #1e293b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.text-col {
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: #f1f5f9;
  }
  
  .formula-box {
    background: rgba(255,255,255,0.05);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-family: monospace;
    font-size: 1.2rem;
    color: #ef4444;
    border-left: 4px solid #ef4444;
  }
  
  .desc {
    font-size: 1.2rem;
    font-style: italic;
    color: #94a3b8;
    margin-bottom: 20px;
  }
  
  .detail {
    line-height: 1.6;
    color: #cbd5e1;
    margin-bottom: 40px;
  }
}

.controls {
  background: rgba(0,0,0,0.2);
  padding: 30px;
  border-radius: 12px;
  
  label {
    display: block;
    margin-bottom: 15px;
    font-weight: bold;
    color: #38bdf8;
  }
  
  .slider {
    width: 100%;
    margin-bottom: 30px;
    cursor: pointer;
  }
  
  .stats {
    display: flex;
    justify-content: space-around;
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .val {
        font-size: 2rem;
        font-weight: 800;
      }
      .lbl {
        font-size: 0.8rem;
        text-transform: uppercase;
        opacity: 0.7;
      }
      
      &.highlight .val {
        color: #ef4444;
      }
    }
  }
}

.vis-col {
  display: flex;
  justify-content: center;
}

.network-vis {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(255,255,255,0.02);
  box-shadow: 0 0 50px rgba(0,0,0,0.2);
  
  .connections-svg {
    width: 100%;
    height: 100%;
    
    line {
      transition: all 0.3s;
    }
    
    circle {
      transition: all 0.3s;
    }
  }
}
</style>