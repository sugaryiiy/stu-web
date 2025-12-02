<template>
  <label class="field">
    <span v-if="label" class="label">{{ label }}</span>
    <div class="control" :class="{ focused }">
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="focused = true"
        @blur="focused = false"
        @input="onInput"
      />
    </div>
    <p v-if="hint" class="hint">{{ hint }}</p>
  </label>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  prefix: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const focused = ref(false)

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.field {
  display: grid;
  gap: 6px;
  font-size: 14px;
  color: #e2e8f0;
}

.label {
  font-weight: 600;
}

.control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 10px 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.control.focused {
  border-color: #22d3ee;
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.15);
}

.prefix {
  font-size: 13px;
  color: #94a3b8;
}

input {
  background: transparent;
  border: none;
  outline: none;
  color: #e2e8f0;
  font: inherit;
}

input::placeholder {
  color: #64748b;
}

input:disabled {
  color: #475569;
}

.hint {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}
</style>
