<template>
  <header class="topbar">
    <div class="topbar-left">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <div class="topbar-actions">
      <button class="ghost">导出报表</button>
      <button class="primary">新建活动</button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '欢迎回来，运营同学！'
  },
  subtitle: {
    type: String,
    default: '实时掌握业务健康度与增长趋势'
  }
})
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.subtitle {
  margin: 6px 0 0;
  color: #94a3b8;
}

.topbar-actions {
  display: flex;
  gap: 12px;
}

@media (max-width: 960px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
