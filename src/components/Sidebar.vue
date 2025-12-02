<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-logo">V</div>
      <div class="brand-meta">
        <p class="brand-title">系统工具集</p>
        <p class="brand-sub">数据运营面板</p>
      </div>
    </div>
    <nav class="menu">
      <p class="menu-label">导航</p>
      <button
        v-for="item in items"
        :key="item.key"
        class="menu-item"
        :class="{ active: item.key === active }"
        @click="$emit('navigate', item.key)"
      >
        <span class="icon">{{ item.icon }}</span>
        {{ item.label }}
      </button>
    </nav>
  </aside>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  active: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, #111827 0%, #0b1220 100%);
  border-right: 1px solid #1f2937;
  padding: 24px;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #22d3ee, #6366f1);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 20px;
  color: #0b1220;
}

.brand-title {
  margin: 0;
  font-weight: 700;
}

.brand-sub {
  margin: 4px 0 0;
  color: #94a3b8;
  font-size: 13px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-label {
  color: #94a3b8;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0 0 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  color: #e2e8f0;
  background: transparent;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.menu-item:hover {
  background: #111827;
  transform: translateX(4px);
}

.menu-item.active {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.18), rgba(45, 212, 191, 0.18));
  border: 1px solid #1f2937;
}

.icon {
  font-size: 16px;
}

.upgrade {
  margin-top: auto;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(45, 212, 191, 0.2));
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 16px;
  text-align: left;
}

.upgrade p {
  margin: 0;
}

.upgrade .muted {
  margin-top: 6px;
}
</style>
