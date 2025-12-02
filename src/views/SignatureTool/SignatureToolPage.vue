<template>
  <div class="page">
    <div class="grid">
      <section class="card">
        <header class="card-header">
          <div>
            <p class="label">GRequest</p>
            <p class="title">网关请求参数</p>
          </div>
          <p class="desc">为签名准备基础请求信息，确保字段与后端约定一致。</p>
        </header>

        <div class="form-grid">
          <label class="field">
            <span>Url</span>
            <input v-model="gateway.url" type="text" placeholder="https://api.example.com/gateway" />
            <small>接口完整地址，将参与签名。</small>
          </label>

          <label class="field">
            <span>AppId</span>
            <input v-model="gateway.appId" type="text" placeholder="app_xxx" />
            <small>调用方分配的 AppId。</small>
          </label>

          <label class="field">
            <span>Status</span>
            <input v-model.number="gateway.status" type="number" min="0" step="1" />
            <small>状态码（数字类型），默认 0 表示有效。</small>
          </label>

          <label class="field">
            <span>AppSecret</span>
            <input v-model="gateway.appSecret" type="password" placeholder="密钥只用于本地生成" />
            <small>仅用于本地生成签名，请妥善保管。</small>
          </label>
        </div>

        <div class="actions">
          <button class="ghost" @click="resetGateway">重置</button>
          <button class="primary" @click="copyGateway">复制 GRequest JSON</button>
          <button class="primary" :disabled="loading" @click="handleGenerate">
            {{ loading ? '生成中...' : '调用后端生成' }}
          </button>
        </div>
      </section>

      <section class="card">
        <header class="card-header">
          <div>
            <p class="label">JsonReq</p>
            <p class="title">业务负载</p>
          </div>
          <p class="desc">粘贴或直接编辑待验签的 JSON 内容。</p>
        </header>

        <label class="field">
          <span>Text</span>
          <textarea
            v-model="jsonText"
            rows="8"
            placeholder='{"orderId":"2024120081","timestamp":1728472800}'
          ></textarea>
          <small>原始字符串会作为 JsonReq.Text 字段参与签名计算。</small>
        </label>

        <div class="actions">
          <button class="ghost" @click="resetJson">清空内容</button>
          <button class="primary" @click="copyJson">复制 JsonReq JSON</button>
        </div>
      </section>
    </div>

    <section class="card preview">
      <header class="card-header">
        <div>
          <p class="label">预览</p>
          <p class="title">即将提交的结构体</p>
        </div>
        <p class="desc">右侧展示会随着输入实时更新，可直接复制用于调试。</p>
      </header>

      <div class="preview-grid">
        <div>
          <p class="preview-title">GRequest</p>
          <pre>{{ gatewayPayload }}</pre>
        </div>
        <div>
          <p class="preview-title">JsonReq</p>
          <pre>{{ jsonPayload }}</pre>
        </div>
        <div v-if="backendResultText">
          <p class="preview-title">后端生成结果 (JsonReq)</p>
          <pre>{{ backendResultText }}</pre>
        </div>
      </div>

      <p v-if="toast" class="toast">{{ toast }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { generateIdentification } from '@/api/signature'

const gateway = ref({
  url: '',
  appId: '',
  status: 0,
  appSecret: ''
})

const jsonText = ref('')
const toast = ref('')
let toastTimer = null
const loading = ref(false)
const backendResult = ref(null)
const backendResultText = computed(() => {
  const payload = backendResult.value?.jsonReq ?? backendResult.value
  return payload ? JSON.stringify(payload, null, 2) : ''
})

const gatewayPayload = computed(() =>
  JSON.stringify(
    {
      url: gateway.value.url,
      appId: gateway.value.appId,
      status: Number.isFinite(gateway.value.status) ? gateway.value.status : 0,
      appSecret: gateway.value.appSecret
    },
    null,
    2
  )
)

const jsonPayload = computed(() => {
  const payload = backendResult.value?.jsonReq ?? backendResult.value ?? { text: jsonText.value }
  return JSON.stringify(payload, null, 2)
})

const resetGateway = () => {
  gateway.value = {
    url: '',
    appId: '',
    status: 0,
    appSecret: ''
  }
}

const resetJson = () => {
  jsonText.value = ''
}

const handleGenerate = async () => {
  loading.value = true
  backendResult.value = null
  try {
    const result = await generateIdentification(
      gateway.value.url,
      gateway.value.appId,
      Number.isFinite(gateway.value.status) ? gateway.value.status : 0,
      gateway.value.appSecret,
      jsonText.value
    )
    const parsedResult = result?.jsonReq || result
    backendResult.value = parsedResult
    if (parsedResult?.text) {
      jsonText.value = parsedResult.text
    }
    showToast('后端生成成功，已回填 JsonReq')
  } catch (error) {
    console.error('generate failed', error)
    showToast('生成失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const showToast = (message) => {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = ''
  }, 1800)
}

const copyGateway = async () => {
  try {
    await navigator.clipboard.writeText(gatewayPayload.value)
    showToast('GRequest 已复制')
  } catch (error) {
    console.error('copy failed', error)
    showToast('复制失败，请手动选择文本')
  }
}

const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(jsonPayload.value)
    showToast('JsonReq 已复制')
  } catch (error) {
    console.error('copy failed', error)
    showToast('复制失败，请手动选择文本')
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.card {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 20px;
  color: #e2e8f0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.label {
  margin: 0;
  color: #94a3b8;
  font-size: 13px;
}

.title {
  margin: 4px 0 0;
  font-size: 20px;
  font-weight: 700;
}

.desc {
  margin: 0;
  color: #94a3b8;
  font-size: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #cbd5e1;
}

input,
textarea {
  background: #0b1220;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 12px;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

textarea {
  min-height: 180px;
  resize: vertical;
}

small {
  color: #94a3b8;
}

.actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

button {
  border-radius: 10px;
  border: 1px solid #1f2937;
  padding: 10px 14px;
  cursor: pointer;
  color: #e2e8f0;
  background: #111827;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

button.primary {
  background: linear-gradient(135deg, #6366f1, #22d3ee);
  color: #0b1220;
  border: none;
}

button.ghost {
  background: transparent;
  color: #cbd5e1;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.preview-title {
  margin: 0 0 8px;
  font-weight: 700;
}

pre {
  margin: 0;
  background: #0b1220;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 14px;
  overflow: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.toast {
  margin: 16px 0 0;
  color: #34d399;
  font-weight: 600;
}
</style>
