<template>
  <div class="layout">
    <Sidebar :items="navItems" :active="activePage" @navigate="setActivePage" />
    <main class="content">
      <TopBar />
      <component :is="currentPage" />
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import OverviewPage from './views/Overview/OverviewPage.vue'
import OrdersPage from './views/Orders/OrdersPage.vue'
import UsersPage from './views/Users/UsersPage.vue'
import SettingsPage from './views/Settings/SettingsPage.vue'

const navItems = [
  { key: 'overview', label: '总览', icon: '📊' },
  { key: 'orders', label: '订单中心', icon: '🛒' },
  { key: 'users', label: '用户管理', icon: '👥' },
  { key: 'settings', label: '系统设置', icon: '⚙️' }
]

const pages = {
  overview: OverviewPage,
  orders: OrdersPage,
  users: UsersPage,
  settings: SettingsPage
}

const activePage = ref('overview')

const currentPage = computed(() => pages[activePage.value] ?? OverviewPage)

const setActivePage = (key) => {
  activePage.value = key
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

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .content {
    padding: 24px;
  }
}
</style>
