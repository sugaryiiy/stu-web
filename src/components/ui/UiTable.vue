<template>
  <section class="table" :class="{ dense }">
    <header class="table-head">
      <div>
        <p class="title">{{ title }}</p>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>
      <div class="actions">
        <slot name="actions" />
      </div>
    </header>

    <div class="table-shell">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" :class="column.align">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="row.id || row.__key || rowIndex">
            <td v-for="column in columns" :key="column.key" :class="column.align">
              <slot :name="`cell-${column.key}`" :row="row">{{ row[column.key] }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!rows.length" class="empty">暂无数据</div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  columns: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  dense: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.table {
  display: grid;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 16px;
}

.table.dense table td,
.table.dense table th {
  padding: 10px 12px;
}

.table-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
  font-weight: 700;
  font-size: 16px;
}

.subtitle {
  margin: 4px 0 0;
  color: #94a3b8;
  font-size: 13px;
}

.actions {
  display: flex;
  gap: 8px;
}

.table-shell {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #1f2937;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #0b1220;
}

th {
  text-align: left;
  color: #94a3b8;
  font-weight: 600;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid #1f2937;
}

td {
  padding: 14px;
  border-bottom: 1px solid #1f2937;
  color: #e2e8f0;
}

tr:last-child td {
  border-bottom: none;
}

th.center,
td.center {
  text-align: center;
}

th.right,
td.right {
  text-align: right;
}

.empty {
  padding: 16px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
}
</style>
