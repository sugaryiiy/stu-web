<template>
  <label class="field" ref="container">
    <span v-if="label" class="label">{{ label }}</span>
    <div class="control" :class="{ open: openMenu }">
      <button class="trigger" type="button" @click="toggle" :disabled="disabled">
        <span class="value">{{ selectedLabel }}</span>
        <span class="chevron">⌄</span>
      </button>
      <transition name="fade">
        <ul v-if="openMenu" class="menu">
          <li
            v-for="option in options"
            :key="option.value"
            :class="{ active: option.value === modelValue }"
            @click="select(option.value)"
          >
            {{ option.label }}
          </li>
        </ul>
      </transition>
    </div>
    <p v-if="hint" class="hint">{{ hint }}</p>
  </label>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const openMenu = ref(false)
const container = ref(null)

const selectedLabel = computed(() => {
  const found = props.options.find((item) => item.value === props.modelValue)
  return found?.label ?? props.placeholder
})

const toggle = () => {
  if (props.disabled) return
  openMenu.value = !openMenu.value
}

const select = (value) => {
  emit('update:modelValue', value)
  openMenu.value = false
}

const onClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    openMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.field {
  display: grid;
  gap: 6px;
  font-size: 14px;
  color: #e2e8f0;
  position: relative;
}

.label {
  font-weight: 600;
}

.control {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #1f2937;
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.control.open {
  border-color: #22d3ee;
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.15);
}

.trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  padding: 12px;
  cursor: pointer;
}

.trigger:disabled {
  cursor: not-allowed;
  color: #475569;
}

.value {
  color: #e2e8f0;
}

.chevron {
  color: #94a3b8;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 6px;
  background: #0b1220;
  border: 1px solid #1f2937;
  border-radius: 12px;
  position: absolute;
  top: calc(100% + 6px);
  width: 100%;
  z-index: 10;
  display: grid;
  gap: 4px;
}

.menu li {
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu li:hover {
  background: rgba(99, 102, 241, 0.12);
}

.menu li.active {
  background: rgba(34, 211, 238, 0.15);
  color: #67e8f9;
}

.hint {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
