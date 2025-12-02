import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8888/api',    // 统一的接口前缀
  timeout: 8000       // 超时时间
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
      // 这里可以加 token
      // const token = localStorage.getItem('token')
      // if (token) config.headers['Authorization'] = token

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
      console.error('Request Error:', error)
      return Promise.reject(error)
    }
)

export default service
