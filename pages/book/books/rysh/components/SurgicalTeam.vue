<template>
  <section class="surgical-team-section">
    <div class="content-container">
      <h2 class="section-title">外科手术式团队</h2>
      <p class="section-desc">
        既然沟通成本高昂，如何组织大型团队？
        <br>Brooks 提出：像外科手术团队一样，由一名"首席程序员"主刀。
      </p>

      <div class="team-explorer">
        <div class="role-orbit">
          <!-- Center Surgeon -->
          <div 
            class="role-node surgeon" 
            :class="{ active: activeRole === 'surgeon' }"
            @click="activeRole = 'surgeon'"
          >
            <i class="iconfont icon-user"></i>
            <span>Surgeon</span>
          </div>

          <!-- Satellites -->
          <div 
            v-for="(role, key) in roles" 
            :key="key"
            class="role-node satellite"
            :class="{ active: activeRole === key, [key]: true }"
            @click="activeRole = key"
          >
            <div class="node-inner">{{ getInitials(key) }}</div>
          </div>
        </div>

        <div class="role-detail-card">
          <transition name="fade" mode="out-in">
            <div :key="activeRole" class="detail-content">
              <h3>{{ getTitle(activeRole) }}</h3>
              <p class="role-desc">{{ getDesc(activeRole) }}</p>
              <div class="analogy-badge">
                Role: {{ activeRole.toUpperCase() }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeRole = ref('surgeon')

const roles = {
  copilot: "首席程序员的'分身'，能编写任何代码，主要作为思考伙伴和后备。",
  administrator: "处理财务、人员、机器时间等行政琐事，让首席专注于技术。",
  editor: "负责根据首席的草稿生成最终文档，确保文档的清晰和发布。",
  clerk: "负责管理所有技术记录的文员。",
  toolsmith: "维护团队所需的专用工具、实用程序和脚本。",
  tester: "设计测试用例，在开发过程中不断挑战代码。",
  language_lawyer: "精通语言细节和系统调用，寻找最优实现方式的专家。"
}

const getTitle = (key: string) => {
  if (key === 'surgeon') return '首席程序员 (The Surgeon)'
  return key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
}

const getDesc = (key: string) => {
  if (key === 'surgeon') return '唯一的架构师和核心代码编写者。拥有最终决策权，类似执刀医生。保证概念完整性的关键。'
  return roles[key as keyof typeof roles]
}

const getInitials = (key: string) => key.substring(0, 2).toUpperCase()
</script>

<style scoped lang="less">
.surgical-team-section {
  min-height: 100vh;
  background: #f1f5f9;
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.content-container {
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 20px;
}

.section-desc {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 60px;
  line-height: 1.6;
}

.team-explorer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.role-orbit {
  position: relative;
  width: 350px;
  height: 350px;
  border: 1px dashed #cbd5e1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .role-node {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    &:hover { transform: scale(1.1); }
    &.active { transform: scale(1.2); box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  }
  
  .surgeon {
    width: 100px;
    height: 100px;
    background: #0f172a;
    color: white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    
    i { font-size: 24px; margin-bottom: 4px; }
    span { font-size: 12px; font-weight: bold; }
  }
  
  .satellite {
    position: absolute;
    width: 50px;
    height: 50px;
    background: #fff;
    border: 2px solid #64748b;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #475569;
    font-size: 12px;
    
    &.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }
  }
  
  // Positioning satellites
  .copilot { top: 10px; left: 50%; transform: translateX(-50%); }
  .administrator { top: 60px; right: 20px; }
  .editor { bottom: 60px; right: 20px; }
  .clerk { bottom: 10px; left: 50%; transform: translateX(-50%); }
  .toolsmith { bottom: 60px; left: 20px; }
  .tester { top: 60px; left: 20px; }
  .language_lawyer { top: 50%; right: -25px; transform: translateY(-50%); }
}

.role-detail-card {
  width: 350px;
  min-height: 200px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
  text-align: left;
  display: flex;
  align-items: center;
  
  h3 {
    color: #0f172a;
    margin-bottom: 12px;
    font-size: 1.25rem;
  }
  
  .role-desc {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .analogy-badge {
    display: inline-block;
    padding: 4px 12px;
    background: #f1f5f9;
    color: #475569;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>