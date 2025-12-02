import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',    // 统一的接口前缀
  timeout: 8000       // 超时时间
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
      // 追加登录态 token，便于后端鉴权
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = token
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
      const res = response.data
      return res   // 这里统一返回 data
    },
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem('token')
        // 避免在非浏览环境调用 window
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      console.error('Request Error:', error)
      return Promise.reject(error)
    }
)

export default service
