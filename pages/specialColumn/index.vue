<!--
 * @Author: Shaoli
 * @Date: 2023-02-26 18:24:44
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-03-08 22:10:06
 * @Description: 请填写文件描述
-->
<template>
  <div class="special-container">
    <div class="page-header">
      <h1>专栏列表</h1>
      <p>精选技术专栏，系统化学习</p>
    </div>
    <div class="special-list-wrapper">
      <SpecialArticleList />
    </div>
  </div>
</template>

<style lang="less" scoped>
.special-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 60px);
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    color: var(--text-main);
    margin-bottom: 12px;
  }
  
  p {
    font-size: 16px;
    color: var(--text-secondary);
  }
}

.special-list-wrapper {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  // 如果 SpecialArticleList 内部有自己的 grid/list 样式，这里只需要提供容器
}

// 响应式设计
@media (max-width: 768px) {
  .special-container {
    padding: 20px 16px;
  }
  
  .page-header {
    margin-bottom: 24px;
    
    h1 {
      font-size: 24px;
    }
  }
  
  .special-list-wrapper {
    padding: 16px;
  }
}
</style>
