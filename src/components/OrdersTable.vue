<template>
  <section class="table-panel">
    <div class="panel-header">
      <p class="panel-title">订单列表</p>
      <div class="pill muted">最近 7 天</div>
    </div>
    <div class="table">
      <div class="table-row header">
        <span>订单号</span>
        <span>渠道</span>
        <span>金额</span>
        <span>状态</span>
      </div>
      <div class="table-row" v-for="order in orders" :key="order.id">
        <span class="muted">{{ order.id }}</span>
        <span>{{ order.channel }}</span>
        <span class="value">￥{{ order.amount.toLocaleString() }}</span>
        <span>
          <span class="pill" :class="order.status === '已完成' ? 'success' : order.status === '退款中' ? 'warning' : 'info'">
            {{ order.status }}
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.table-panel .table {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #1f2937;
  border-radius: 16px;
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 14px 16px;
  align-items: center;
}

.table-row.header {
  background: #111827;
  font-weight: 600;
  color: #94a3b8;
}

.table-row:not(.header) {
  border-top: 1px solid #1f2937;
}

@media (max-width: 960px) {
  .table-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
