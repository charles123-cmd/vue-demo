<template>
  <div class="notfound">
    <h2>404</h2>
    <p>页面不存在</p>
    <router-link to="/todos">
      <el-button type="primary">返回待办</el-button>
    </router-link>
  </div>
</template>

<style scoped>
.notfound { text-align: center; padding: 60px 20px; }
.notfound h2 { font-size: 48px; color: #4f46e5; margin-bottom: 8px; }
.notfound p { color: #999; margin-bottom: 20px; }
</style>