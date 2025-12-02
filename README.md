# stu-web 请求工具

`src/utils/request.js` 提供了一个基于 `fetch` 的简单封装，支持 GET、POST、PUT、DELETE 等任意 HTTP 方法，并能根据返回的 `Content-Type` 自动解析 JSON 或返回文本。

## 使用示例

```js
import { request } from './src/utils/request.js'

// GET 请求
const data = await request({ url: '/api/user' })

// POST 请求（JSON）
await request({
  url: '/api/user',
  method: 'POST',
  body: { name: '张三' }
})

// 上传表单
const formData = new FormData()
formData.append('file', file)
await request({
  url: '/api/upload',
  method: 'POST',
  body: formData
})
```

> 注意：GET 请求会自动忽略 body；当 body 是普通对象时会自动序列化为 JSON 并补全 `Content-Type` 头。
