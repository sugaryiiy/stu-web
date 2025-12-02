export async function request({
                                url,
                                method = 'GET',
                                headers,
                                body = null
                              } = {}) {
  if (!url) {
    throw new Error('请求地址不能为空')
  }

  const normalizedMethod = method.toUpperCase()
  const isJsonBody = body && typeof body === 'object' && !(body instanceof FormData)
  const normalizedHeaders = new Headers(headers || {})

  if (isJsonBody && !normalizedHeaders.has('Content-Type')) {
    normalizedHeaders.set('Content-Type', 'application/json')
  }

  const normalizedBody = isJsonBody ? JSON.stringify(body) : body ?? undefined

  const response = await fetch(url, {
    method: normalizedMethod,
    headers: normalizedHeaders,
    body: normalizedMethod === 'GET' ? undefined : normalizedBody
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new Error(`接口异常：${response.status}${errorText ? ` - ${errorText}` : ''}`)
  }

  const contentType = response.headers.get('Content-Type') || ''
  if (contentType.includes('application/json')) {
    return await response.json()
  }

  return await response.text()
}
