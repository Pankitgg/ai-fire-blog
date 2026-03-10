<!--
 * @Author: Shaoli
 * @Date: 2023-02-12 12:31:28
 * @LastEditors: AI Assistant
 * @LastEditTime: 2025-07-01
 * @Description: 左侧菜单 - Redesigned
-->
<template>
  <div class="left-menu">
    <div class="left-menu-fixed">
      <NuxtLink
        v-for="item in menus"
        :key="item.name"
        class="menu-item"
        :to="item.url"
        active-class="active"
      >
        <div class="icon-wrapper">
          <i :class="`iconfont ${item.icon}`"></i>
        </div>
        <span class="name">{{ item.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 菜单列表数据
const menus = ref<Record<string, string>[]>([
  // {
  //   icon: 'icon-home',
  //   name: '首页',
  //   url: '/home'
  // },
  {
    icon: 'icon-blog',
    name: 'AI资讯',
    url: '/blog'
  },
  {
    icon: 'icon-data',
    name: 'AI产品库',
    url: '/product/aiproduct'
  },
  {
    icon: 'icon-Book_duotone_line',
    name: '图书',
    url: '/book/book'
  },
  {
    icon: 'icon-zhuanlan',
    name: '专题',
    url: '/specialColumn'
  },
  {
    icon: 'icon-profile',
    name: '关于',
    url: '/profile'
  }
])
</script>

<style lang="less">
.content-body {
  flex: 1;
  // max-width: calc(100% - 660px);
}

.left-menu {
  width: 220px;
  flex-shrink: 0;
  margin-right: 20px;
}

.left-menu-fixed {
  padding: 24px 0;
  position: fixed;
  top: 70px;
  width: 220px;
  
  .menu-item {
    display: flex;
    align-items: center;
    height: 52px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    margin-bottom: 8px;
    padding: 0 16px;
    text-decoration: none;
    
    &:hover {
      background: var(--bg-secondary);
      color: var(--text-main);
      transform: translateX(4px);
    }
    
    &.active {
      background: var(--primary-bg-light);
      color: var(--primary-color);
      
      .icon-wrapper {
        color: var(--primary-color);
      }
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin-right: 12px;
      border-radius: 8px;
      transition: all 0.3s;
      
      .iconfont {
        font-size: 22px;
      }
    }
  }
}

// 响应式调整
@media screen and (min-width: 1280px) and (max-width: 1400px) {
  .left-menu {
    width: 180px;
  }
  .left-menu-fixed {
    width: 180px;
  }
  .content-body {
    max-width: calc(100% );
  }
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .left-menu {
    width: 80px;
    margin-right: 10px;
  }
  .left-menu-fixed {
    width: 80px;
    
    .menu-item {
      justify-content: center;
      padding: 0;
      
      .name {
        display: none;
      }
      
      .icon-wrapper {
        margin-right: 0;
      }
    }
  }
  .content-body {
    max-width: calc(100% );
  }
}

@media screen and (max-width: 1023px) {
  .content-body {
    max-width: 100% !important;
  }
  
  .left-menu {
    display: none; // 在移动端使用底部导航或抽屉，这里先隐藏左侧
  }
  
  // 移动端底部导航样式
  .left-menu-fixed {
    display: flex;
    position: fixed;
    bottom: 0;
    top: auto;
    width: 100%;
    height: 60px;
    padding: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--border-color);
    z-index: 1000;
    justify-content: space-around;
    
    .menu-item {
      flex-direction: column;
      justify-content: center;
      height: 100%;
      margin: 0;
      border-radius: 0;
      flex: 1;
      font-size: 12px;
      
      &:hover {
        background: transparent;
        transform: none;
      }
      
      .icon-wrapper {
        margin-right: 0;
        margin-bottom: 2px;
        width: auto;
        height: auto;
        
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}

// 适配移动端显示
@media screen and (max-width: 1023px) {
  .left-menu {
    display: block; // 恢复显示以便显示底部导航
    width: 0;
    margin: 0;
  }
}
</style>
