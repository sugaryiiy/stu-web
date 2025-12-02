<template>
  <div v-if="isAuthPage" class="auth-wrapper">
    <RouterView />
  </div>
  <div v-else class="layout">
    <Sidebar :items="navItems" :active="activeNav" @navigate="navigate" />
    <main class="content">
      <TopBar />
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'

const route = useRoute()
const router = useRouter()

const navItems = [
  { key: 'overview', label: '总览', icon: '📊', path: '/' },
  { key: 'orders', label: '订单中心', icon: '🛒', path: '/orders' },
  { key: 'users', label: '用户管理', icon: '👥', path: '/users' },
  { key: 'settings', label: '系统设置', icon: '⚙️', path: '/settings' }
]

const activeNav = computed(() => route.value?.meta?.navKey ?? '')
const isAuthPage = computed(() => route.value?.meta?.layout === 'auth')

const navigate = (key) => {
  const target = navItems.find((item) => item.key === key)
  if (target) {
    router.push(target.path)
  }
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  color: #e2e8f0;
}

.content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.auth-wrapper {
  min-height: 100vh;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .content {
    padding: 24px;
  }
}
</style>
