<template>
  <div class="contrast-panel">
    <div class="panel left">
      <h3>{{ beforeTitle }}</h3>
      <div class="content">
        <slot name="before"></slot>
      </div>
    </div>
    <div class="divider">
      <div class="icon">VS</div>
    </div>
    <div class="panel right">
      <h3>{{ afterTitle }}</h3>
      <div class="content">
        <slot name="after"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  beforeTitle: {
    type: String,
    default: '前80回'
  },
  afterTitle: {
    type: String,
    default: '后28回'
  }
})
</script>

<style scoped>
.contrast-panel {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: stretch;
}

.panel {
  flex: 1;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.panel:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-5px);
}

.left {
  border-left: 4px solid #d81b60; /* Joy color */
}

.right {
  border-left: 4px solid #5d6d7e; /* Tragedy color */
}

.panel h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #555;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 0.5rem;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.icon {
  background: #2c3e50;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .contrast-panel {
    flex-direction: column;
    gap: 1rem;
  }
  
  .divider {
    height: 40px;
  }
}
</style>
