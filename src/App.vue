<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="nav">
        <span class="logo">✅ Vue Todo</span>
        <div class="links">
          <router-link to="/todos">待办</router-link>
          <router-link to="/about">关于</router-link>
        </div>
      </div>
    </el-header>

    <el-main>
      <router-view />
    </el-main>

    <el-footer class="footer">
      © 2026 Vue Todo · 20天前端学习计划
    </el-footer>
  </el-container>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; background: #f5f5ff; color: #333; }
.layout { min-height: 100vh; }
.header { background: #fff; border-bottom: 1px solid #eee; display: flex; align-items: center; }
.nav { display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 800px; margin: 0 auto; }
.logo { font-weight: bold; font-size: 18px; }
.links { display: flex; gap: 20px; }
.links a { text-decoration: none; color: #333; }
.links a.router-link-active { color: #4f46e5; font-weight: bold; }
.footer { text-align: center; color: #999; font-size: 13px; display: flex; align-items: center; justify-content: center; }
</style>