<template>
  <div class="page">
    <header class="page-head">
      <div>
        <p class="page-title">用户管理</p>
        <p class="muted">用户画像、分群与权限配置</p>
      </div>
      <div class="actions">
        <button class="ghost">导出</button>
        <button class="primary">新建用户</button>
      </div>
    </header>

    <div class="placeholder">
      <p class="muted">用户管理页面内容待设计与开发。</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 8px;
}

.placeholder {
  background: #0f172a;
  border: 1px dashed #1f2937;
  border-radius: 16px;
  padding: 32px;
}
</style>
