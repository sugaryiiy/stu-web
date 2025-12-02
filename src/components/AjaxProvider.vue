<template>
  <slot :data="data" :loading="loading" :error="error" :refresh="fetchData" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    default: 'GET'
  },
  headers: {
    type: Object,
    default: () => ({
      'Content-Type': 'application/json'
    })
  },
  body: {
    type: [Object, String, ArrayBuffer, FormData],
    default: null
  },
  auto: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['success', 'error', 'loading'])

const loading = ref(false)
const error = ref('')
const data = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = ''
  emit('loading', true)

  try {
    const response = await fetch(props.url, {
      method: props.method,
      headers: props.headers,
      body: props.body && typeof props.body === 'object' && !(props.body instanceof FormData)
        ? JSON.stringify(props.body)
        : props.body
    })

    if (!response.ok) {
      throw new Error(`接口异常：${response.status}`)
    }

    const payload = await response.json()
    data.value = payload
    emit('success', payload)
  } catch (err) {
    const message = err?.message || '请求失败'
    error.value = message
    emit('error', message)
  } finally {
    loading.value = false
    emit('loading', false)
  }
}

onMounted(() => {
  if (props.auto) {
    fetchData()
  }
})

watch(
  () => [props.url, props.method, props.body, props.auto],
  () => {
    if (props.auto) {
      fetchData()
    }
  }
)

defineExpose({
  refresh: fetchData
})
</script>
