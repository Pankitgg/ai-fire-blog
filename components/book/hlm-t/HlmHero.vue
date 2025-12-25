<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="main-title">
        <span class="block">癸酉本</span>
        <span class="block highlight">石头记</span>
      </h1>
      <p class="subtitle">
        从“鲜花着锦”到“白茫茫大地真干净”
      </p>
      <p class="desc">
        探究《红楼梦》前80回与后28回的巨大反差，还原一个残酷而真实的结局。
      </p>
      
      <div class="actions">
        <NuxtLink to="/book/books/hlm-t/characters" class="btn primary">开始阅览</NuxtLink>
        <NuxtLink to="/book/books/hlm-t/analysis" class="btn secondary">深入解析</NuxtLink>
      </div>
    </div>
    
    <div class="hero-visual">
       <div class="circle-bg"></div>
       <div class="stone-symbol">🪨</div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.main-title {
  font-size: 4rem;
  font-family: 'Songti SC', serif;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.block {
  display: block;
}

.highlight {
  color: var(--primary-color, #d81b60);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
  font-style: italic;
}

.desc {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.7;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn.primary {
  background: var(--primary-color, #d81b60);
  color: white;
  box-shadow: 0 4px 15px rgba(216, 27, 96, 0.4);
}

.btn.secondary {
  background: transparent;
  border: 2px solid currentColor;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.circle-bg {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  position: absolute;
  z-index: 0;
}

.stone-symbol {
  font-size: 10rem;
  position: relative;
  z-index: 1;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    margin-bottom: 3rem;
  }
  
  .actions {
    justify-content: center;
  }
}
</style>
