<template>
  <div class="page">
    <header class="page-head">
      <div>
        <p class="page-title">订单中心</p>
        <p class="muted">通过筛选器快速查找订单，并在下方表格中查看状态</p>
      </div>
      <div class="actions">
        <button class="ghost">导出</button>
        <button class="primary">创建订单</button>
      </div>
    </header>

    <section class="panel">
      <div class="filters">
        <UiTextField v-model="search" label="关键词" placeholder="搜索订单号 / 用户" prefix="🔍" />
        <UiSelect v-model="status" :options="statusOptions" label="订单状态" />
        <UiSelect v-model="channel" :options="channelOptions" label="销售渠道" />
      </div>
    </section>

    <UiTable
      title="近期订单"
      subtitle="展示最近的渠道订单及支付金额"
      :columns="columns"
      :rows="filteredOrders"
      dense
    >
      <template #cell-amount="{ row }">
        <span class="value">¥ {{ row.amount.toLocaleString() }}</span>
      </template>
      <template #cell-status="{ row }">
        <span class="status" :class="statusTone(row.status)">{{ row.status }}</span>
      </template>
    </UiTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import UiSelect from '../../components/ui/UiSelect.vue'
import UiTable from '../../components/ui/UiTable.vue'
import UiTextField from '../../components/ui/UiTextField.vue'

const columns = [
  { key: 'id', label: '订单号' },
  { key: 'channel', label: '渠道' },
  { key: 'customer', label: '用户' },
  { key: 'amount', label: '金额', align: 'right' },
  { key: 'status', label: '状态', align: 'center' },
  { key: 'date', label: '时间' }
]

const orders = ref([
  { id: '#2024120081', channel: '抖音直播', customer: 'Luna', amount: 3280, status: '已完成', date: '10:12' },
  { id: '#2024120076', channel: '京东自营', customer: 'Wen', amount: 1299, status: '发货中', date: '09:58' },
  { id: '#2024120064', channel: '小红书', customer: 'Chen', amount: 880, status: '已完成', date: '09:21' },
  { id: '#2024120047', channel: '微信小店', customer: 'Ray', amount: 1560, status: '退款中', date: '08:46' },
  { id: '#2024120041', channel: '抖音直播', customer: 'Zhao', amount: 2299, status: '待支付', date: '08:12' },
  { id: '#2024120033', channel: '小红书', customer: 'Echo', amount: 620, status: '已完成', date: '07:55' }
])

const search = ref('')
const status = ref('all')
const channel = ref('all')

const statusOptions = [
  { value: 'all', label: '全部状态' },
  { value: '已完成', label: '已完成' },
  { value: '发货中', label: '发货中' },
  { value: '退款中', label: '退款中' },
  { value: '待支付', label: '待支付' }
]

const channelOptions = [
  { value: 'all', label: '全部渠道' },
  { value: '抖音直播', label: '抖音直播' },
  { value: '小红书', label: '小红书' },
  { value: '京东自营', label: '京东自营' },
  { value: '微信小店', label: '微信小店' }
]

const filteredOrders = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return orders.value.filter((item) => {
    const hitKeyword = keyword
      ? item.id.toLowerCase().includes(keyword) || item.customer.toLowerCase().includes(keyword)
      : true
    const hitStatus = status.value === 'all' ? true : item.status === status.value
    const hitChannel = channel.value === 'all' ? true : item.channel === channel.value
    return hitKeyword && hitStatus && hitChannel
  })
})

const statusTone = (value) => {
  if (value === '已完成') return 'success'
  if (value === '发货中') return 'info'
  if (value === '退款中') return 'warning'
  return 'muted'
}
</script>

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

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.status {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #1f2937;
}

.status.success {
  color: #67e8f9;
  border-color: rgba(34, 211, 238, 0.5);
}

.status.info {
  color: #c084fc;
  border-color: rgba(192, 132, 252, 0.5);
}

.status.warning {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.5);
}

@media (max-width: 720px) {
  .page-head {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .actions {
    width: 100%;
  }

  .actions button {
    flex: 1;
  }
}
</style>
