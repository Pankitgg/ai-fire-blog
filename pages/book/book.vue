<template>
  <div class="book-library-page">
    <div class="page-header">
      <h1><span class="highlight">图书馆</span></h1>
    </div>
    
    <!-- 第一部分：新视角图书 -->
    <section class="book-section">
      <div class="section-header">
        <h2>新视角图书</h2>
        <p class="section-description">以全新的视角和维度进行阅读和交互</p>
      </div>
      
      <div class="books-grid">
        <div 
          v-for="book in recommendedBooks"
          :key="book.id"
          class="book-card-3d"
          @click="navigateToBook(book.route)"
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
    </section>
    
    <!-- 第二部分：传统图书（预留） -->
    <section class="book-section traditional-section">
      <div class="section-header">
        <h2>经典图书</h2>
        <p class="section-description">传统阅读模式增加书评与交互的功能</p>
      </div>
      
      <div class="books-grid placeholder-grid">
        <div class="book-placeholder">
          <div class="placeholder-icon">📚</div>
          <p>即将上线</p>
        </div>
        <div class="book-placeholder">
          <div class="placeholder-icon">📖</div>
          <p>敬请期待</p>
        </div>
        <div class="book-placeholder">
          <div class="placeholder-icon">📕</div>
          <p>更多内容</p>
        </div>
        <div class="book-placeholder">
          <div class="placeholder-icon">📗</div>
          <p>持续更新</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { recommendedBooks } from '@/utils/bookRegistry'

const router = useRouter()

const navigateToBook = (route: string) => {
  router.push(route)
}
</script>

<style scoped lang="less">
.book-library-page {
  padding: 40px;
  width: 100%;
  min-height: 100%;
  background-color: #f8fafc;
}

.page-header {
  margin-bottom: 50px;
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 10px;
    
    .highlight {
      color: #3b82f6;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 8px;
        background: rgba(59, 130, 246, 0.2);
        z-index: -1;
      }
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #64748b;
  }
}

.book-section {
  margin-bottom: 60px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-header {
  margin-bottom: 30px;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 5px;
  }
  
  .section-description {
    font-size: 0.95rem;
    color: #64748b;
  }
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;
  padding-bottom: 20px;
}

.book-card-3d {
  position: relative;
  width: 90px;
  height: 130px;
  perspective: 500px;
  cursor: pointer;
  margin: 0 auto;
  
  &:hover {
    .book-card-inner {
      transform: rotateY(-8deg) translateY(-4px);
    }
    .book-shadow {
      opacity: 0.5;
      transform: scale(0.92);
    }
    .book-info-overlay {
      opacity: 1;
    }
  }
}

.book-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 4px;
  box-shadow: 
    -1px 0 1px rgba(0,0,0,0.08),
    2px 2px 6px rgba(0,0,0,0.1);
}

.book-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px 4px 4px 2px;
  overflow: hidden;
  background: #fff;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to right, 
      rgba(255,255,255,0.2) 0%, 
      rgba(0,0,0,0.1) 20%, 
      rgba(0,0,0,0.2) 50%, 
      rgba(0,0,0,0) 100%);
    z-index: 10;
  }
}

.book-sheen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
}

.book-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 6px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: #fff;
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: 0 0 4px 2px;
  transform: translateZ(1px);
  
  h3 {
    font-size: 0.55rem;
    font-weight: bold;
    margin-bottom: 2px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  p {
    font-size: 0.45rem;
    color: #e2e8f0;
    margin-bottom: 4px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: none;
  }
  
  .read-more {
    display: none;
  }
}

.book-shadow {
  position: absolute;
  bottom: -5px;
  left: 5%;
  width: 90%;
  height: 8px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
  transition: all 0.4s ease;
  z-index: -1;
  opacity: 0.25;
}

/* 传统图书预留区域 */
.traditional-section {
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;
}

.book-placeholder {
  width: 90px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 4px;
  border: 1px dashed #cbd5e1;
  margin: 0 auto;
  
  .placeholder-icon {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }
  
  p {
    font-size: 0.5rem;
    color: #94a3b8;
  }
}
</style>
