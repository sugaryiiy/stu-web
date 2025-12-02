<template>
  <section class="panel">
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
  </section>
</template>

<script setup>
import { type PropType } from 'vue'

const props = defineProps({
  tasks: {
    type: Array as PropType<Array<{ title: string; desc: string; status: string }>>,
    default: () => []
  }
})
</script>

<style scoped>
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
</style>
