<template>
  <section class="stats-grid">
    <div class="card" v-for="card in cards" :key="card.title">
      <div class="card-meta">
        <p class="muted">{{ card.title }}</p>
        <p class="value">{{ card.value }}</p>
      </div>
      <div class="trend" :class="{ up: card.trend > 0, down: card.trend < 0 }">
        {{ card.trend > 0 ? '+' : '' }}{{ card.trend }}%
      </div>
      <div class="progress">
        <div class="bar" :style="{ width: `${card.progress}%` }"></div>
      </div>
      <p class="muted small">目标完成度 {{ card.progress }}%</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  gap: 8px;
}

.card-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.trend {
  font-weight: 600;
  color: #22d3ee;
}

.trend.down {
  color: #f59e0b;
}

.progress {
  width: 100%;
  height: 8px;
  background: #111827;
  border-radius: 999px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(135deg, #22d3ee, #6366f1);
}
</style>
