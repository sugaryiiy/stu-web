export async function request({ url, method = 'GET', headers = { 'Content-Type': 'application/json' }, body = null } = {}) {
  if (!url) {
    throw new Error('请求地址不能为空')
  }

  const normalizedBody = body && typeof body === 'object' && !(body instanceof FormData)
    ? JSON.stringify(body)
    : body

  const response = await fetch(url, {
    method,
    headers,
    body: normalizedBody
  })

  if (!response.ok) {
    throw new Error(`接口异常：${response.status}`)
  }

  return await response.json()
}
