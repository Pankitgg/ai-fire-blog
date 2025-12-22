<template>
  <div class="book-library-page">
    <div class="page-header">
      <h1>Classic Knowledge <span class="highlight">Library</span></h1>
      <p>Explore the foundational wisdom of software engineering.</p>
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

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  padding-bottom: 40px;
}

.book-card-3d {
  position: relative;
  width: 280px;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
  margin: 0 auto;
  
  &:hover {
    .book-card-inner {
      transform: rotateY(-10deg) translateY(-10px);
    }
    .book-shadow {
      opacity: 0.6;
      transform: scale(0.9);
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
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 12px;
  box-shadow: 
    -1px 0 2px rgba(0,0,0,0.1), /* Spine */
    5px 5px 15px rgba(0,0,0,0.15);
}

.book-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px 12px 12px 4px;
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
    width: 12px;
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
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
}

.book-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0 0 12px 4px;
  transform: translateZ(1px); /* Ensure it's above */
  
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  
  p {
    font-size: 0.9rem;
    color: #e2e8f0;
    margin-bottom: 10px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  .read-more {
    display: inline-block;
    padding: 6px 12px;
    background: #3b82f6;
    color: #fff;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
}

.book-shadow {
  position: absolute;
  bottom: -15px;
  left: 5%;
  width: 90%;
  height: 20px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%);
  transition: all 0.5s ease;
  z-index: -1;
  opacity: 0.3;
}
</style>