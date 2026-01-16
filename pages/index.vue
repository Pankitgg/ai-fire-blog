<template>
  <div class="ai-hub-container">
    <!-- 顶部导航 -->
    <nav class="flat-nav">
      <div class="nav-wrapper">
        <div class="brand">
          <span class="logo-icon">✦</span>
          <span class="logo-text">AI-Fire Hub</span>
        </div>
        <div class="nav-menu">
          <a href="#tool">全能工作台</a>
          <a href="#blog">资讯流</a>
          <a href="https://blog.ai-nous.com/" target="_blank" class="external-link">
            技术博客 <i class="iconfont icon-link"></i>
          </a>
          <button class="nav-cta" @click="router.push('/ai/chatOnce')">开始咨询</button>
        </div>
        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>

    <!-- Hero 区域：透视 AI 世界 (Interactive Creative Element) -->
    <header class="hero-lens-section" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <div class="lens-wrapper">
        <!-- 底层：自然风景 (Reality) -->
        <div class="layer reality-layer">
          <div class="bg-image"></div>
          <div class="hero-text-overlay">
            <h1>探索 AI 的无限视界</h1>
            <p>移动鼠标，透过 AI 之眼看世界</p>
            <div class="scroll-hint">Scroll Down</div>
          </div>
        </div>

        <!-- 顶层：AI 数据分析 (Augmented Reality) -->
        <div class="layer ai-layer" :style="lensStyle">
          <div class="ai-grid-bg"></div>
          <div class="ai-data-points">
            <!-- 动态跟随鼠标的数据点 -->
            <div v-for="(point, index) in activeDataPoints" :key="index" 
                 class="dynamic-point"
                 :style="{ left: point.x + 'px', top: point.y + 'px' }">
               <span class="point-label">{{ point.label }}</span>
               <span class="point-val">{{ point.value }}%</span>
            </div>
            
            <div class="scan-line"></div>
            <div class="crosshair" :style="{ left: mouseX + 'px', top: mouseY + 'px' }"></div>
          </div>
          <div class="hero-text-overlay ai-mode">
            <h1>解析数据的内在逻辑</h1>
            <p>深度学习 · 模式识别 · 智能决策</p>
            <div class="tech-badges">
              <span>NLP</span><span>CV</span><span>KG</span>
            </div>
          </div>
        </div>

        <!-- 放大镜边框 -->
        <div class="lens-border" :style="lensBorderStyle">
          <div class="lens-info">SCANNING...</div>
        </div>
      </div>
    </header>

    <!-- 外部博客推荐模块 (跳转到 blog.ai-nous.com) -->
    <section class="section blog-recommend-section">
      <div class="section-container">
        <div class="blog-promo-card">
          <div class="promo-content">
            <div class="promo-header">
              <div class="promo-tag">Featured Partner</div>
              <span class="live-indicator"><span class="blink">●</span> LIVE</span>
            </div>
            <h2>PankitGG's Tech Blog</h2>
            <p class="promo-desc">
              探索 AI 工作流、一人公司 (OPC) 理论、以及基于 Astro & Fuwari 的现代化博客部署方案。
              这里有关于 <strong>飞书多维文档 CMS</strong>、<strong>Project Graph</strong> 等前沿技术思想的深度分享。
            </p>
            <div class="promo-stats">
              <div class="stat">
                <span class="num">79+</span>
                <span class="label">Days Online</span>
              </div>
              <div class="stat">
                <span class="num">15+</span>
                <span class="label">Tech Articles</span>
              </div>
            </div>
            <a href="https://blog.ai-nous.com/" target="_blank" class="promo-btn">
              访问博客 <i class="iconfont icon-link"></i>
            </a>
          </div>
          <div class="promo-visual">
            <div class="browser-mockup">
              <div class="browser-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <div class="address-bar">https://blog.ai-nous.com</div>
              </div>
              <div class="browser-body">
                <div class="skeleton-hero"></div>
                <div class="skeleton-grid">
                  <div class="s-card c1"></div>
                  <div class="s-card c2"></div>
                  <div class="s-card c3"></div>
                </div>
                <div class="floating-elements">
                  <div class="float-tag t1">Astro</div>
                  <div class="float-tag t2">React</div>
                  <div class="float-tag t3">AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 工作台 -->
    <section class="section workbench-section" id="tool">
      <div class="section-container">
        <div class="workbench-card">
          <div class="workbench-content">
            <div class="workbench-badge">Windows AI 工作台</div>
            <h2>把常用 AI、组件与网页工具装进一个桌面工作台</h2>
            <p class="workbench-desc">
              集成数字员工、多人会议室、组件市场（热加载插件）与小程序聚合，把碎片化工具沉淀成可复用的工作流。
            </p>
            <div class="workbench-features">
              <div class="feature-item">
                <div class="feature-icon">👥</div>
                <div class="feature-text">
                  <div class="t">数字员工</div>
                  <div class="d">为不同角色配置提示词与模型</div>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🗣️</div>
                <div class="feature-text">
                  <div class="t">会议室协作</div>
                  <div class="d">多员工参与讨论，历史可保存</div>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🧩</div>
                <div class="feature-text">
                  <div class="t">插件热加载</div>
                  <div class="d">Vue 组件即插件，可安装可优化</div>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🌐</div>
                <div class="feature-text">
                  <div class="t">小程序聚合</div>
                  <div class="d">把常用网页工具统一入口</div>
                </div>
              </div>
            </div>
            <div class="workbench-actions">
              <a class="workbench-btn" href="https://studio.ai-nous.com/" target="_blank" rel="noopener">
                打开工作台官网 <i class="iconfont icon-link"></i>
              </a>
              <div class="workbench-tip">点击后在新窗口打开</div>
            </div>
          </div>
          <div class="workbench-visual">
            <div class="workbench-mock">
              <div class="mock-top">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <div class="mock-title">AI Tool Windows 工作台</div>
              </div>
              <div class="mock-body">
                <div class="mock-grid">
                  <div class="mock-tile">
                    <div class="k">Employees</div>
                    <div class="v">Prompt · Model</div>
                  </div>
                  <div class="mock-tile">
                    <div class="k">Meeting</div>
                    <div class="v">Multi-agent</div>
                  </div>
                  <div class="mock-tile">
                    <div class="k">Plugins</div>
                    <div class="v">Hot Reload</div>
                  </div>
                  <div class="mock-tile">
                    <div class="k">Mini Apps</div>
                    <div class="v">One-click</div>
                  </div>
                </div>
                <div class="mock-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 资讯流 -->
    <section class="section news-ticker-section" id="blog">
      <div class="section-container">
        <div class="section-title">
          <h2>资讯流</h2>
          <p>来自「每日快讯」的最新文章</p>
        </div>

        <div class="ticker-card">
          <div class="ticker-head">
            <div class="ticker-tag">Daily News</div>
            <button class="ticker-refresh" :disabled="newsLoading" @click="loadDailyNews">
              {{ newsLoading ? '刷新中...' : '刷新' }}
            </button>
          </div>

          <div class="ticker-empty" v-if="!newsLoading && tickerSourceList.length === 0">
            暂无快讯内容
          </div>

          <div class="ticker-wrap" v-else>
            <div class="ticker-track" :style="{ animationDuration: tickerDuration + 's' }">
              <div
                v-for="item in tickerItems"
                :key="String(item.id) + '-' + item.__dup"
                class="ticker-item"
                @click="openNews(item)"
              >
                <div class="thumb" v-if="item.thumbnail">
                  <img :src="item.thumbnail" :alt="item.title" />
                </div>
                <div class="thumb placeholder" v-else>
                  <div class="ph">NEWS</div>
                </div>
                <div class="info">
                  <div class="title">{{ item.title }}</div>
                  <div class="intro">{{ item.intro }}</div>
                  <div class="meta">{{ formatTime(item.publishTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 迷思 -->
    <MythSection 
      class="experience-box-section" 
      title="体验之盒" 
      :style="{ background: mythBackgroundColor, transition: 'background 0.8s ease' }"
      @update:color="handleMythColorUpdate"
    />
    <!-- 互动电影 -->

    <!-- 图书展览 -->
    <section class="book-exhibition-section">
      <div class="section-container">
        <div class="section-title">
          <h2><span class="highlight">跨越时空的书籍</span></h2>
          <p>带你用一种完全不同的视角进行阅读</p>
        </div>
        <div class="books-grid">
          <div 
            v-for="book in recommendedBooks" 
            :key="book.id" 
            class="book-card-3d"
            @click="router.push(book.route)"
          >
            <div class="book-card-inner">
              <div class="book-cover">
                <img :src="book.coverImage" :alt="book.title" />
                <div class="book-sheen"></div>
              </div>
              <div class="book-info-overlay">
                 <h3>{{ book.title }}</h3>
                 <p>{{ book.subtitle }}</p>
                 <span class="read-more">Click to Read</span>
              </div>
            </div>
            <div class="book-shadow"></div>
          </div>
        </div>
      </div>
    </section>
      <!-- 核心功能入口 (扁平化卡片) -->
    <section class="section tools-section" id="tools">
      <div class="section-container">
        <div class="section-title">
          <h2>综合工具箱</h2>
          <p>集成多模态 AI 能力，为您的一站式工作台</p>
        </div>
        
        <div class="flat-grid">
          <!-- 智能咨询 -->
          <div class="flat-card primary-card" @click="router.push('/ai/chatOnce')">
            <div class="card-badge">HOT</div>
            <div class="card-icon">💬</div>
            <div class="card-content">
              <h3>AI 智能咨询</h3>
              <p>全天候 AI 助手，解答技术难题，提供创意灵感。支持多轮对话与上下文理解。</p>
              <span class="card-action">立即对话 &rarr;</span>
            </div>
          </div>

          <!-- 知识库 -->
          <div class="flat-card secondary-card" @click="router.push('/blog')">
            <div class="card-icon">📚</div>
            <div class="card-content">
              <h3>知识图谱</h3>
              <p>精选 AI 领域文章与教程，构建您的知识体系。涵盖从入门到进阶的全方位内容。</p>
              <span class="card-action">浏览文章 &rarr;</span>
            </div>
          </div>

          <!-- 工具集 (占位) -->
          <div class="flat-card accent-card">
            <div class="card-icon">🛠️</div>
            <div class="card-content">
              <h3>效率工具集</h3>
              <p>代码生成、文本润色、数据分析等实用工具。助力开发效率提升 10x。</p>
              <span class="card-action">敬请期待</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 简易页脚 -->
    <footer class="flat-footer">
      <div class="footer-content">
        <div class="copyright">© 2025 AI-Fire Hub. All rights reserved.</div>
        <div class="socials">
          <a href="#">Github</a>
          <a href="#">Twitter</a>
          <a href="#">Discord</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'
import { recommendedBooks } from '@/utils/bookRegistry'
import MythSection from '~/components/myths/MythSection.vue'
import request from '@/utils/request'

definePageMeta({
  layout: false
})

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 放大镜交互逻辑
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const activeDataPoints = ref<{x: number, y: number, label: string, value: number}[]>([])
const mythBackgroundColor = ref('transparent')

const handleMythColorUpdate = (color: string) => {
  mythBackgroundColor.value = color
}

// 模拟数据生成
const generateDataPoints = (x: number, y: number) => {
  // 仅在移动时随机生成几个点
  if (Math.random() > 0.7) return
  
  const labels = ['Confidence', 'Nature', 'Structure', 'Light', 'Entropy']
  const newPoint = {
    x: x + (Math.random() - 0.5) * 100,
    y: y + (Math.random() - 0.5) * 100,
    label: labels[Math.floor(Math.random() * labels.length)],
    value: Math.floor(Math.random() * 100)
  }
  
  activeDataPoints.value.push(newPoint)
  
  // 限制点数量并自动移除
  if (activeDataPoints.value.length > 5) {
    activeDataPoints.value.shift()
  }
  
  setTimeout(() => {
    activeDataPoints.value = activeDataPoints.value.filter(p => p !== newPoint)
  }, 1000)
}

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
  isHovering.value = true
  
  generateDataPoints(mouseX.value, mouseY.value)
}

const handleMouseLeave = () => {
  isHovering.value = false
  activeDataPoints.value = []
}

// 动态计算 Clip-path
const lensStyle = computed(() => {
  if (!isHovering.value) {
    return {
      clipPath: `circle(0px at 50% 50%)`
    }
  }
  return {
    clipPath: `circle(200px at ${mouseX.value}px ${mouseY.value}px)`
  }
})

// 放大镜边框跟随
const lensBorderStyle = computed(() => {
  if (!isHovering.value) return { opacity: 0 }
  return {
    left: `${mouseX.value}px`,
    top: `${mouseY.value}px`,
    opacity: 1
  }
})

type CateBlogItem = {
  id: number
  title: string
  intro: string
  publishTime: string
  thumbnail: string
}

const newsLoading = ref(false)
const tickerSourceList = ref<CateBlogItem[]>([])

const tickerDuration = computed(() => {
  const n = tickerSourceList.value.length
  if (n <= 0) return 14
  const seconds = Math.max(14, Math.min(34, n * 3))
  return seconds
})

const tickerItems = computed(() => {
  const list = tickerSourceList.value || []
  const out: Array<CateBlogItem & { __dup: number }> = []
  for (const item of list) out.push({ ...item, __dup: 0 })
  for (const item of list) out.push({ ...item, __dup: 1 })
  return out
})

const formatTime = (t: string) => {
  if (!t) return ''
  const d = new Date(t)
  if (Number.isNaN(d.getTime())) return String(t)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const openNews = (item: CateBlogItem) => {
  if (!item?.id) return
  router.push(`/detail/${item.id}`)
}

const loadDailyNews = async () => {
  if (newsLoading.value) return
  newsLoading.value = true
  try {
    const res: any = await request.post('/blog/getCateBlogList', {
      cateId: 4,
      pageNum: 1,
      pageSize: 10
    })
    const list = (res?.data?.list as CateBlogItem[]) || []
    tickerSourceList.value = list
  } finally {
    newsLoading.value = false
  }
}

onMounted(() => {
  loadDailyNews()
})
</script>

<style lang="less" scoped>
/* 全局扁平化变量 */
:root {
  --flat-bg: #ffffff;
  --flat-bg-alt: #f8f9fa;
  --flat-primary: #3b82f6; /* Blue 500 */
  --flat-secondary: #10b981; /* Emerald 500 */
  --flat-accent: #8b5cf6; /* Violet 500 */
  --flat-text: #1f2937;
  --flat-text-light: #6b7280;
  --flat-border: #e5e7eb;
}

.ai-hub-container {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #1f2937;
  background: #ffffff;
  min-height: 100vh;
}

/* 导航 */
.flat-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  z-index: 100;

  .nav-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 1.25rem;
    
    .logo-icon {
      color: var(--flat-primary);
    }
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 32px;

    a {
      text-decoration: none;
      color: #4b5563;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;

      &:hover {
        color: var(--flat-primary);
      }
      
      &.external-link {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--flat-accent);
        background: rgba(139, 92, 246, 0.1);
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 0.85rem;
        
        .iconfont { font-size: 12px; }
        
        &:hover {
            background: rgba(139, 92, 246, 0.2);
        }
      }
    }

    .nav-cta {
      background: #1f2937;
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: black;
      }
    }
  }
  
  .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
      span {
          width: 24px;
          height: 2px;
          background: #1f2937;
      }
  }
}

/* Hero Lens Section */
.hero-lens-section {
  position: relative;
  height: 90vh; /* Use viewport height for better adaptability */
  min-height: 600px;
  max-height: 900px;
  margin-top: 64px;
  overflow: hidden;
  cursor: none; /* Hide default cursor */
  background: #f0f9ff;
  user-select: none;
}

.lens-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Reality Layer (Nature) */
.reality-layer {
  background: linear-gradient(120deg, #e0f2fe 0%, #f0fdf4 100%);
  
  .bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    /* High quality nature landscape */
    background-image: url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2000');
    background-size: cover;
    background-position: center;
    filter: saturate(0.8);
  }

  .hero-text-overlay {
    z-index: 10;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 4px 12px rgba(0,0,0,0.5);
    
    h1 {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 1.5rem;
      font-weight: 500;
      opacity: 0.9;
    }
    
    .scroll-hint {
        margin-top: 40px;
        font-size: 0.8rem;
        opacity: 0.7;
        animation: bounce 2s infinite;
    }
  }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

/* AI Layer (Tech/Data) */
.ai-layer {
  background: #0f172a;
  
  .ai-grid-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
    
    &::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle at center, transparent 0%, #0f172a 90%);
    }
  }

  .hero-text-overlay.ai-mode {
    color: #10b981;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    z-index: 10;
    
    h1 { font-family: 'Courier New', monospace; }
    p { font-family: monospace; letter-spacing: 2px; }
    
    .tech-badges {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 12px;
        span {
            border: 1px solid #10b981;
            padding: 4px 8px;
            font-size: 12px;
            background: rgba(16, 185, 129, 0.1);
        }
    }
  }

  .ai-data-points {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 5;
    pointer-events: none;
    
    .dynamic-point {
      position: absolute;
      padding: 4px 8px;
      background: rgba(16, 185, 129, 0.9);
      color: #0f172a;
      font-family: monospace;
      font-size: 10px;
      border-radius: 2px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      white-space: nowrap;
      
      .point-label { font-weight: bold; margin-right: 4px; }
    }

    .crosshair {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(16, 185, 129, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        &::before, &::after {
            content: '';
            position: absolute;
            background: rgba(16, 185, 129, 0.8);
        }
        &::before { top: 50%; left: -5px; width: 30px; height: 1px; transform: translateY(-50%); }
        &::after { left: 50%; top: -5px; height: 30px; width: 1px; transform: translateX(-50%); }
    }

    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #10b981;
      box-shadow: 0 0 15px #10b981;
      animation: scan 2s linear infinite;
    }
  }
}

@keyframes scan {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.lens-border {
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.2);
  z-index: 20;
  transition: opacity 0.2s;
  
  .lens-info {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.8);
      font-family: monospace;
      font-size: 12px;
      letter-spacing: 2px;
  }
}

/* Sections */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px; /* Increased padding for more breathing room */
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: #111827;
  }
  p {
    color: #6b7280;
    font-size: 1.1rem;
  }
}

/* Flat Grid */
.flat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.flat-card {
  position: relative;
  padding: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
  }
  
  .card-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      font-size: 10px;
      font-weight: 800;
      padding: 4px 8px;
      border-radius: 4px;
  }

  .card-icon {
    font-size: 48px;
    margin-bottom: 24px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .card-action {
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
  }

  /* Color Variations */
  &.primary-card {
    background: #eff6ff;
    border: 1px solid #dbeafe;
    h3 { color: #1d4ed8; }
    .card-action { color: #2563eb; }
    &:hover { border-color: #2563eb; }
  }

  &.secondary-card {
    background: #f0fdf4;
    border: 1px solid #dcfce7;
    h3 { color: #15803d; }
    .card-action { color: #16a34a; }
    &:hover { border-color: #16a34a; }
  }

  &.accent-card {
    background: #f5f3ff;
    border: 1px solid #ede9fe;
    h3 { color: #7c3aed; }
    .card-action { color: #8b5cf6; }
    &:hover { border-color: #8b5cf6; }
  }
}

/* Blog Promo Section */
.blog-recommend-section {
  background: #ffffff;
  border-top: 1px solid #f3f4f6;
  margin-bottom: 60px;
}

.blog-promo-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: #f8fafc;
  border-radius: 32px;
  padding: 60px;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &::before {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 6px;
      background: linear-gradient(90deg, #FF6B6B, #FF8E53);
  }
}

.promo-content {
  .promo-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
  }
  
  .promo-tag {
    display: inline-block;
    padding: 6px 16px;
    background: #1e293b;
    color: white;
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .live-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ef4444;
      font-weight: 700;
      font-size: 0.8rem;
      .blink { animation: blink 1.5s infinite; }
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.2;
    color: #0f172a;
  }

  .promo-desc {
    font-size: 1.15rem;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .promo-stats {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
    
    .stat {
      .num {
        display: block;
        font-size: 2rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1;
        margin-bottom: 4px;
      }
      .label {
        font-size: 0.875rem;
        color: #64748b;
        font-weight: 500;
      }
    }
  }

  .promo-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #0f172a;
    color: white;
    padding: 16px 36px;
    border-radius: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.3);
      background: #1e293b;
    }
  }
}

@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

.promo-visual {
    perspective: 1000px;
}

.browser-mockup {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  height: 360px;
  transform: rotateY(-5deg) rotateX(2deg);
  transition: transform 0.3s ease;
  
  &:hover {
      transform: rotateY(0) rotateX(0);
  }

  .browser-header {
    background: #f8fafc;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #e2e8f0;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      &.red { background: #ef4444; }
      &.yellow { background: #f59e0b; }
      &.green { background: #10b981; }
    }

    .address-bar {
      flex: 1;
      background: white;
      margin-left: 12px;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      color: #64748b;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      &::before { content: '🔒'; font-size: 10px; margin-right: 6px; }
    }
  }

  .browser-body {
    padding: 24px;
    background: #f8fafc;
    height: 100%;
    position: relative;
  }

  .skeleton-hero {
    width: 100%;
    height: 140px;
    background: linear-gradient(120deg, #e2e8f0 30%, #f1f5f9 50%, #e2e8f0 70%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite linear;
    border-radius: 12px;
    margin-bottom: 24px;
  }

  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .s-card {
      height: 100px;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
  }
  
  .floating-elements {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none;
      
      .float-tag {
          position: absolute;
          background: rgba(255,255,255,0.9);
          padding: 6px 12px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          
          &.t1 { top: 40px; right: 40px; animation: float 3s ease-in-out infinite; }
          &.t2 { top: 180px; left: 20px; animation: float 4s ease-in-out infinite 1s; }
          &.t3 { bottom: 80px; right: 80px; animation: float 3.5s ease-in-out infinite 0.5s; }
      }
  }
}

@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

/* Footer */
.flat-footer {
  padding: 40px 0;
  border-top: 1px solid #e5e7eb;
  background: white;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .socials {
    display: flex;
    gap: 24px;

    a {
      color: #6b7280;
      text-decoration: none;
      transition: color 0.2s;
      &:hover { color: #111827; }
    }
  }
}
.experience-box-section{
  /* background is now handled dynamically via style binding */
}
.book-exhibition-section {
  background: #f8fafc;
  padding-bottom: 80px;

  .books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 240px));
    gap: 40px;
    justify-content: center;
    padding: 20px;
  }

  .book-card-3d {
    width: 200px;
    height: 300px;
    position: relative;
    perspective: 1000px;
    cursor: pointer;
    
    &:hover {
      .book-card-inner {
        transform: rotateY(-20deg) rotateX(10deg) translateY(-20px);
        box-shadow: 20px 20px 30px rgba(0,0,0,0.2);
      }
      .book-shadow {
        opacity: 0.6;
        transform: scale(0.9);
      }
    }

    .book-card-inner {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.5s ease, box-shadow 0.5s ease;
      border-radius: 4px;
      box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
      background: #fff;
    }

    .book-cover {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      border-radius: 4px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .book-sheen {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
        pointer-events: none;
      }
    }

    .book-info-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
      color: #fff;
      transform: translateZ(1px);
      opacity: 0;
      transition: opacity 0.3s;
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: 4px;
        color: #fff;
      }
      p {
        font-size: 0.8rem;
        opacity: 0.8;
        margin-bottom: 8px;
        color: #e2e8f0;
      }
      .read-more {
        font-size: 0.75rem;
        font-weight: bold;
        color: #3b82f6;
        text-transform: uppercase;
      }
    }
    
    &:hover .book-info-overlay {
      opacity: 1;
    }

    .book-shadow {
      position: absolute;
      bottom: -20px;
      left: 5%;
      width: 90%;
      height: 20px;
      background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
      opacity: 0.3;
      transition: all 0.5s ease;
      transform: scale(1);
      z-index: -1;
    }
  }
}

.workbench-section {
  background: #0b1220;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 60px;
}

.workbench-card {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 44px;
  align-items: center;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.92) 0%, rgba(2, 6, 23, 0.96) 100%);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 28px;
  padding: 48px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(2, 6, 23, 0.55);
}

.workbench-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
}

.workbench-content {
  position: relative;
  z-index: 2;
}

.workbench-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.16);
  border: 1px solid rgba(16, 185, 129, 0.28);
  color: #a7f3d0;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  margin-bottom: 14px;
}

.workbench-content h2 {
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #f8fafc;
  margin-bottom: 14px;
  line-height: 1.15;
}

.workbench-desc {
  color: rgba(226, 232, 240, 0.85);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 24px;
}

.workbench-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 16px;
  margin-bottom: 26px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.18);
  backdrop-filter: blur(10px);
}

.feature-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(59, 130, 246, 0.9));
  color: #ffffff;
  font-size: 18px;
}

.feature-text .t {
  font-weight: 900;
  color: rgba(248, 250, 252, 0.95);
  font-size: 0.95rem;
  line-height: 1.1;
}

.feature-text .d {
  color: rgba(226, 232, 240, 0.7);
  font-size: 0.85rem;
  margin-top: 4px;
}

.workbench-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.workbench-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: #ffffff;
  text-decoration: none;
  font-weight: 800;
  transition: transform 0.2s, filter 0.2s;
}

.workbench-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.workbench-tip {
  font-size: 0.9rem;
  color: rgba(148, 163, 184, 0.9);
}

.workbench-visual {
  position: relative;
  z-index: 1;
}

.workbench-mock {
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: #0b1220;
  box-shadow: 0 22px 60px rgba(2, 6, 23, 0.24);
}

.mock-top {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mock-top .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.mock-top .dot.red { background: #ef4444; }
.mock-top .dot.yellow { background: #f59e0b; }
.mock-top .dot.green { background: #10b981; }

.mock-title {
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 700;
  font-size: 12px;
}

.mock-body {
  position: relative;
  padding: 18px;
  min-height: 220px;
}

.mock-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.mock-tile {
  border-radius: 16px;
  padding: 14px 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mock-tile .k {
  color: #ffffff;
  font-weight: 900;
  font-size: 14px;
}

.mock-tile .v {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 12px;
}

.mock-glow {
  position: absolute;
  right: -80px;
  bottom: -80px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  filter: blur(40px);
  background: radial-gradient(circle, rgba(16, 185, 129, 0.45), rgba(59, 130, 246, 0.22), rgba(139, 92, 246, 0));
  z-index: 1;
}

.news-ticker-section {
  background: #ffffff;
  border-top: 1px solid #f3f4f6;
  margin-bottom: 60px;
}

.ticker-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 28px;
  padding: 26px;
  overflow: hidden;
}

.ticker-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.ticker-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  font-weight: 900;
  font-size: 0.8rem;
}

.ticker-refresh {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #0f172a;
  font-weight: 800;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.ticker-refresh:hover:not(:disabled) {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.ticker-refresh:disabled {
  opacity: 0.6;
  cursor: default;
}

.ticker-empty {
  padding: 24px;
  color: #64748b;
  font-weight: 700;
  text-align: center;
  border: 1px dashed #cbd5e1;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
}

.ticker-wrap {
  height: 320px;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.8);
}

.ticker-track {
  display: flex;
  flex-direction: column;
  animation-name: tickerScroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

.ticker-wrap:hover .ticker-track {
  animation-play-state: paused;
}

@keyframes tickerScroll {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}

.ticker-item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 14px;
  padding: 14px;
  cursor: pointer;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s;
}

.ticker-item:hover {
  background: #f8fafc;
}

.ticker-item:last-child {
  border-bottom: none;
}

.ticker-item .thumb {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #0f172a;
}

.ticker-item .thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ticker-item .thumb.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.ticker-item .thumb.placeholder .ph {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 1px;
}

.ticker-item .info .title {
  font-weight: 900;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.ticker-item .info .intro {
  color: #475569;
  font-size: 0.92rem;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ticker-item .info .meta {
  margin-top: 8px;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Responsive */
@media (max-width: 1024px) {
  .flat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .blog-promo-card {
    grid-template-columns: 1fr;
    padding: 40px;
    gap: 40px;
  }
  
  .browser-mockup {
      height: 280px;
      transform: none;
  }

  .workbench-card {
    grid-template-columns: 1fr;
    padding: 40px;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .hero-lens-section {
    height: 400px;
  }

  .flat-grid {
    grid-template-columns: 1fr;
  }
  
  .nav-menu {
    display: none; 
    /* Ideally add a slide-out menu here */
  }
  
  .mobile-menu-btn {
      display: flex !important;
  }
  
  .hero-text-overlay h1 {
      font-size: 2.5rem !important;
  }

  .workbench-card {
    padding: 26px;
  }

  .workbench-content h2 {
    font-size: 1.75rem;
  }

  .workbench-features {
    grid-template-columns: 1fr;
  }

  .ticker-wrap {
    height: 360px;
  }
}
</style>
