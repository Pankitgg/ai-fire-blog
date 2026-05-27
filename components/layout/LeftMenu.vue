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
    name: '资讯',
    url: '/blog'
  },
  {
    icon: 'icon-data',
    name: '工具',
    url: '/product/aiproduct'
  },
  {
    icon: 'icon-Book_duotone_line',
    name: '图书',
    url: '/book/book'
  },
  {
    icon: 'icon-zhuanlan',
    name: '精选',
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
  display: none; // 默认隐藏，大屏不显示
}

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
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    
    &:hover {
      background: transparent;
      color: var(--text-main);
    }
    
    &.active {
      color: var(--primary-color);
      
      .icon-wrapper {
        color: var(--primary-color);
      }
    }
    
    .icon-wrapper {
      margin-right: 0;
      margin-bottom: 2px;
      width: auto;
      height: auto;
      
      .iconfont {
        font-size: 20px;
        color: inherit;
      }
    }
  }
}

// 大屏隐藏左侧菜单（已在默认样式中隐藏）
@media screen and (min-width: 1024px) {
  .left-menu {
    display: none !important;
  }
}

// 小屏显示底部导航
@media screen and (max-width: 1023px) {
  .left-menu {
    display: block;
    width: 0;
    margin: 0;
  }
  
  .content-body {
    max-width: 100% !important;
  }
}
</style>
