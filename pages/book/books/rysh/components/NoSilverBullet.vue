<template>
  <section class="no-silver-bullet-section">
    <div class="container">
      <div class="header">
        <h2>没有银弹 (No Silver Bullet)</h2>
        <p class="subtitle">软件工程的根本困难 vs 次要困难</p>
      </div>

      <div class="interactive-board">
        <div class="toggle-group">
          <button 
            :class="{ active: view === 'essence' }" 
            @click="view = 'essence'"
          >
            Essence (根本)
          </button>
          <button 
            :class="{ active: view === 'accident' }" 
            @click="view = 'accident'"
          >
            Accidents (次要)
          </button>
        </div>

        <div class="card-display">
          <transition name="slide-up" mode="out-in">
            <div v-if="view === 'essence'" class="card essence" key="essence">
              <div class="card-icon">⚡</div>
              <h3>软件固有的特性</h3>
              <p>这些困难无法被工具消除，是软件的本质属性。</p>
              <ul>
                <li><strong>Complexity (复杂性):</strong> 状态数量巨大，非线性增长。</li>
                <li><strong>Conformity (一致性):</strong> 必须遵从人为的接口标准。</li>
                <li><strong>Changeability (可变性):</strong> 变更压力远超硬件。</li>
                <li><strong>Invisibility (不可见性):</strong> 无法进行几何表达。</li>
              </ul>
            </div>

            <div v-else class="card accident" key="accident">
              <div class="card-icon">🛠️</div>
              <h3>实现手段造成的困难</h3>
              <p>可以通过更好的工具和方法解决。</p>
              <ul>
                <li>高级语言 (High-level languages)</li>
                <li>分时系统 (Time-sharing)</li>
                <li>统一的开发环境</li>
                <li>语法错误检查</li>
              </ul>
              <div class="note">这些在今天大多已解决，但并未带来10倍效率提升。</div>
            </div>
          </transition>
        </div>
      </div>

      <div class="solution-bar">
        <span>有希望的途径:</span>
        <div class="tags">
          <span class="tag">Buy vs Build</span>
          <span class="tag">Prototyping</span>
          <span class="tag">Incremental Dev</span>
          <span class="tag highlight">Great Designers</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const view = ref('essence')
</script>

<style scoped lang="less">
.no-silver-bullet-section {
  min-height: 100vh;
  background: #27272a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.header {
  margin-bottom: 50px;
  h2 {
    font-size: 2.5rem;
    color: #e4e4e7;
    margin-bottom: 10px;
  }
  .subtitle {
    color: #a1a1aa;
    font-size: 1.2rem;
  }
}

.interactive-board {
  margin-bottom: 50px;
}

.toggle-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  
  button {
    padding: 12px 30px;
    background: transparent;
    border: 2px solid #52525b;
    color: #a1a1aa;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s;
    
    &:hover { border-color: #71717a; color: #fff; }
    
    &.active {
      background: #fff;
      border-color: #fff;
      color: #18181b;
    }
  }
}

.card-display {
  height: 400px; /* fixed height to prevent jump */
  perspective: 1000px;
}

.card {
  background: #3f3f46;
  padding: 40px;
  border-radius: 20px;
  text-align: left;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid #52525b;
  
  .card-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #fff;
  }
  
  p {
    color: #d4d4d8;
    margin-bottom: 25px;
    font-size: 1.1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 10px 0;
      border-bottom: 1px solid #52525b;
      color: #a1a1aa;
      &:last-child { border-bottom: none; }
      
      strong { color: #e4e4e7; margin-right: 5px; }
    }
  }
  
  &.essence {
    border-top: 6px solid #ef4444;
  }
  
  &.accident {
    border-top: 6px solid #3b82f6;
  }
  
  .note {
    margin-top: 20px;
    font-size: 0.9rem;
    color: #71717a;
    font-style: italic;
  }
}

.solution-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #a1a1aa;
  flex-wrap: wrap;
  
  .tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .tag {
    padding: 6px 12px;
    background: #18181b;
    border-radius: 4px;
    font-size: 0.9rem;
    
    &.highlight {
      color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.3);
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>