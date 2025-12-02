import request from '@/utils/request'

export function generateIdentification(url, appId, status, appSecret) {
  return request({
    url: '/generateIdentification',
    method: 'post',
    data: {
      url,
      appId,
      status,
      appSecret
    }
  })
}
