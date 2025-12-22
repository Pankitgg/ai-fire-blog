<template>
  <section class="retrospective-section">
    <h2 class="title">20年后的反思</h2>
    
    <div class="timeline">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="timeline-item"
        :class="{ left: index % 2 === 0, right: index % 2 !== 0 }"
      >
        <div class="content">
          <h3>{{ item.topic }}</h3>
          <div class="card">
             <div v-if="item.correction" class="update-box">
               <div class="label">CORRECTION</div>
               <p>{{ item.correction }}</p>
             </div>
             <div v-if="item.acknowledgment" class="update-box">
               <div class="label">ACKNOWLEDGMENT</div>
               <p>{{ item.acknowledgment }}</p>
             </div>
             <div v-if="item.insight" class="update-box">
               <div class="label">INSIGHT</div>
               <p>{{ item.insight }}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const items = [
  {
    topic: "瀑布模型 vs 增量模型",
    correction: "原书第11章'打算扔掉一个'暗示了瀑布模型，这是错误的。正确的做法是'增量开发'——先让系统跑起来，再逐步扩充功能。"
  },
  {
    topic: "信息隐藏 (Information Hiding)",
    acknowledgment: "承认低估了 Parnas '信息隐藏'理论的重要性。这是应对软件'复杂性'的唯一有效设计策略。"
  },
  {
    topic: "人是关键",
    insight: "尽管流程和工具很重要，但核心依然是'人'。寻找和培养高素质的工程设计人员是重中之重。"
  }
]
</script>

<style scoped lang="less">
.retrospective-section {
  min-height: 100vh;
  background: #fff;
  color: #1f2937;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 60px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 3px solid #1f2937;
  padding-bottom: 10px;
}

.timeline {
  position: relative;
  max-width: 1000px;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: #e5e7eb;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -1px;
  }
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  
  &.left {
    left: 0;
    text-align: right;
    
    .content { align-items: flex-end; }
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      right: -8px;
      background-color: #fff;
      border: 4px solid #1f2937;
      top: 20px;
      border-radius: 50%;
      z-index: 1;
    }
  }
  
  &.right {
    left: 50%;
    text-align: left;
    
    .content { align-items: flex-start; }
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      left: -8px;
      background-color: #fff;
      border: 4px solid #1f2937;
      top: 20px;
      border-radius: 50%;
      z-index: 1;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #111827;
  }
}

.card {
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

.update-box {
  .label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #4b5563;
    margin-bottom: 5px;
    letter-spacing: 1px;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #374151;
  }
}

@media (max-width: 768px) {
  .timeline::after { left: 31px; }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    
    &.left, &.right {
      left: 0;
      text-align: left;
      .content { align-items: flex-start; }
    }
    
    &.left::after, &.right::after {
      left: 23px;
    }
  }
}
</style>