<template>
  <section class="panel">
    <div class="panel-header">
      <p class="panel-title">渠道表现</p>
      <div class="pill success">实时</div>
    </div>
    <div class="channel-list">
      <div class="channel" v-for="channel in channels" :key="channel.name">
        <div class="channel-meta">
          <p class="channel-name">{{ channel.name }}</p>
          <p class="muted">{{ channel.desc }}</p>
        </div>
        <div class="channel-stats">
          <span class="value">{{ channel.value }}</span>
          <span class="pill" :class="channel.trend > 0 ? 'success' : 'warning'">
            {{ channel.trend > 0 ? '↑' : '↓' }} {{ channel.trend }}%
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { type PropType } from 'vue'

const props = defineProps({
  channels: {
    type: Array as PropType<Array<{ name: string; desc: string; value: string; trend: number }>>,
    default: () => []
  }
})
</script>

<style scoped>
.channel-list {
  display: grid;
  gap: 12px;
}

.channel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: #0f172a;
  border: 1px solid #1f2937;
}

.channel-name {
  margin: 0 0 6px;
  font-weight: 600;
}

.channel-stats {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
