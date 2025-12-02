<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo">V</div>
        <div class="brand-meta">
          <p class="brand-title">Vue 管理系统</p>
          <p class="brand-sub">数据运营面板</p>
        </div>
      </div>
      <nav class="menu">
        <p class="menu-label">导航</p>
        <a class="menu-item active" href="#">
          <span class="icon">📊</span>
          总览
        </a>
        <a class="menu-item" href="#">
          <span class="icon">🛒</span>
          订单中心
        </a>
        <a class="menu-item" href="#">
          <span class="icon">👥</span>
          用户管理
        </a>
        <a class="menu-item" href="#">
          <span class="icon">⚙️</span>
          系统设置
        </a>
      </nav>
      <div class="upgrade">
        <p>专属运营顾问</p>
        <p class="muted">获取定制化增长方案</p>
        <button>预约沟通</button>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <div class="topbar-left">
          <p class="title">欢迎回来，运营同学！</p>
          <p class="subtitle">实时掌握业务健康度与增长趋势</p>
        </div>
        <div class="topbar-actions">
          <button class="ghost">导出报表</button>
          <button class="primary">新建活动</button>
        </div>
      </header>

      <div class="status-row" v-if="loading || error">
        <div v-if="loading" class="pill info">后台数据同步中…</div>
        <div v-else class="pill warning">{{ error }}</div>
      </div>

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

      <section class="data-panels">
        <div class="panel">
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
        </div>

        <div class="panel">
          <div class="panel-header">
            <p class="panel-title">待办任务</p>
            <div class="pill muted">本周</div>
          </div>
          <ul class="todo-list">
            <li v-for="task in tasks" :key="task.title" class="todo">
              <div>
                <p class="todo-title">{{ task.title }}</p>
                <p class="muted">{{ task.desc }}</p>
              </div>
              <span class="pill" :class="task.status === '紧急' ? 'warning' : 'success'">{{ task.status }}</span>
            </li>
          </ul>
          <button class="ghost full">添加任务</button>
        </div>
      </section>

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
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const loading = ref(false)
const error = ref('')

const cards = ref([
  { title: 'GMV（今日）', value: '¥ 1,248,000', trend: 12.4, progress: 72 },
  { title: '新增用户', value: '3,482', trend: 8.6, progress: 64 },
  { title: '活跃会员', value: '12,930', trend: -2.1, progress: 51 },
  { title: '营销转化率', value: '6.3%', trend: 3.2, progress: 77 }
])

const channels = ref([
  { name: '抖音直播', desc: '直播带货 + 短视频投放', value: '¥ 618,000', trend: 16.8 },
  { name: '小红书', desc: '种草笔记 + 社区运营', value: '¥ 232,500', trend: 6.2 },
  { name: '京东自营', desc: '官方旗舰店', value: '¥ 184,400', trend: -3.6 }
])

const tasks = ref([
  { title: '更新首页焦点图', desc: '配合 12.12 节奏替换素材', status: '紧急' },
  { title: '优化新客引导弹窗', desc: 'A/B 测试 B 版本留资率', status: '进行中' },
  { title: '补充私域 SOP', desc: '完善线索跟进话术模板', status: '进行中' }
])

const orders = ref([
  { id: '#2024120081', channel: '抖音直播', amount: 3280, status: '已完成' },
  { id: '#2024120076', channel: '京东自营', amount: 1299, status: '发货中' },
  { id: '#2024120064', channel: '小红书', amount: 880, status: '已完成' },
  { id: '#2024120047', channel: '微信小店', amount: 1560, status: '退款中' }
])

const applyResponse = (payload) => {
  if (Array.isArray(payload?.cards) && payload.cards.length) cards.value = payload.cards
  if (Array.isArray(payload?.channels) && payload.channels.length) channels.value = payload.channels
  if (Array.isArray(payload?.tasks) && payload.tasks.length) tasks.value = payload.tasks
  if (Array.isArray(payload?.orders) && payload.orders.length) orders.value = payload.orders
}

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('/api/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`接口返回异常：${response.status}`)
    }

    const payload = await response.json()
    applyResponse(payload)
  } catch (err) {
    error.value = err.message || '拉取数据失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboard()
})
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  color: #e2e8f0;
}

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

.upgrade button {
  margin-top: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #22d3ee, #6366f1);
  color: #0b1220;
  font-weight: 700;
  cursor: pointer;
}

.content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: -4px;
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

button.primary {
  background: linear-gradient(135deg, #22d3ee, #6366f1);
  border: none;
  color: #0b1220;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

button.ghost {
  background: transparent;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
}

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

.value {
  font-weight: 700;
  font-size: 18px;
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

.muted {
  color: #94a3b8;
  margin: 0;
}

.small {
  font-size: 12px;
}

.data-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  gap: 12px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  margin: 0;
  font-weight: 700;
}

.pill {
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid #1f2937;
}

.pill.success {
  background: rgba(34, 211, 238, 0.15);
  color: #67e8f9;
}

.pill.warning {
  background: rgba(245, 158, 11, 0.12);
  color: #fbbf24;
}

.pill.info {
  background: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
}

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

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #1f2937;
}

.todo-title {
  margin: 0 0 6px;
  font-weight: 600;
}

button.full {
  width: 100%;
  text-align: center;
}

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
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: relative;
    height: auto;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .table-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
