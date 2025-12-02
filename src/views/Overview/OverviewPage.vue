<template>
  <div class="page">
    <div class="status-row" v-if="loading || error">
      <div v-if="loading" class="pill info">后台数据同步中…</div>
      <div v-else class="pill warning">{{ error }}</div>
      <button v-if="error" class="ghost compact" @click="refreshDashboard">重试</button>
    </div>

    <StatsGrid :cards="cards" />

    <section class="panels-grid">
      <ChannelPanel :channels="channels" />
      <TodoPanel :tasks="tasks" />
    </section>

    <OrdersTable :orders="orders" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ChannelPanel from '../../components/ChannelPanel.vue'
import OrdersTable from '../../components/OrdersTable.vue'
import StatsGrid from '../../components/StatsGrid.vue'
import TodoPanel from '../../components/TodoPanel.vue'

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

const refreshDashboard = () => {
  fetchDashboard()
}

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''

  try {
    const payload = await request({ url: '/api/dashboard' })
    applyResponse(payload)
  } catch (err) {
    error.value = err?.message || '请求失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboard()
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.status-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: -4px;
}

.compact {
  padding: 8px 12px;
  font-size: 12px;
  line-height: 1;
}

.panels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}
</style>
