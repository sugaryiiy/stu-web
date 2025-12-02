<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="title">欢迎登录</h1>
      <p class="subtitle">请输入账号和密码继续访问控制台</p>
      <form class="login-form" @submit.prevent="handleLogin">
        <label class="field">
          <span>账号</span>
          <input v-model="username" type="text" placeholder="请输入账号" required />
        </label>
        <label class="field">
          <span>密码</span>
          <input v-model="password" type="password" placeholder="请输入密码" required />
        </label>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button class="primary" type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/api'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (loading.value) return
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await login({ username: username.value, password: password.value })
    const token = response?.token || 'mock-token'
    localStorage.setItem('token', token)
    await router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    errorMessage.value = '登录失败，请检查账号密码后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.15), transparent 25%),
    radial-gradient(circle at 80% 0%, rgba(45, 212, 191, 0.2), transparent 30%),
    #0b1220;
  color: #e2e8f0;
  padding: 24px;
}

.login-card {
  width: min(420px, 100%);
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.35);
}

.title {
  margin: 0;
  font-size: 26px;
}

.subtitle {
  margin: 8px 0 24px;
  color: #94a3b8;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #cbd5e1;
}

input {
  background: #0b1220;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 12px;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.primary {
  background: linear-gradient(135deg, #6366f1, #22d3ee);
  border: none;
  border-radius: 10px;
  padding: 12px;
  color: #0b1220;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.primary:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.error {
  color: #f87171;
  margin: 0;
}
</style>
