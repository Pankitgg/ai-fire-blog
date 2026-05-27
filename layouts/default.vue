<!--
 * @Author: Shaoli
 * @Date: 2023-01-08 22:35:28
 * @LastEditors: AI Assistant
 * @LastEditTime: 2025-07-01
 * @Description: 默认布局
-->
<template>
  <NavBar class="normal" />
  <div class="content-containter">
    <LeftMenu />
    <NuxtPage class="content-body" />
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import LeftMenu from '@/components/layout/LeftMenu.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<style lang="less" scoped>
.content-containter {
  height: calc(100% - 60px);
  min-height: calc(100vh - 70px);
  margin: auto;
  padding-top: 60px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>