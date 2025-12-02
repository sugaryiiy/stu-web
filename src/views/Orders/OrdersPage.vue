<template>
  <div class="page">
    <header class="page-head">
      <div>
        <p class="page-title">订单中心</p>
        <p class="muted">查看并管理各渠道的订单状态</p>
      </div>
      <div class="actions">
        <button class="ghost">导出</button>
        <button class="primary">创建订单</button>
      </div>
    </header>

    <div class="placeholder">
      <p class="muted">订单中心页面内容待接入后台接口。</p>
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
