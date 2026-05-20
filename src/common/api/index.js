/* API 请求封装 */

const BASE_URL = '/api'

async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.header || {})
  }

  try {
    const res = await fetch(BASE_URL + url, {
      method: options.method || 'GET',
      headers,
      body: options.data ? JSON.stringify(options.data) : undefined
    })

    if (res.status === 401) {
      localStorage.removeItem('token')
      window.uni.showToast({ title: '登录已过期', icon: 'none' })
      window.location.hash = '#/'
      throw new Error('登录已过期')
    }

    const data = await res.json()
    if (res.ok) return data
    window.uni.showToast({ title: data.message || '请求失败', icon: 'none' })
    throw data
  } catch (err) {
    if (err.message !== '登录已过期') {
      window.uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
    }
    throw err
  }
}

const api = {
  get(url, data) { return request(url, { method: 'GET', data }) },
  post(url, data) { return request(url, { method: 'POST', data }) },
  put(url, data) { return request(url, { method: 'PUT', data }) },
  delete(url, data) { return request(url, { method: 'DELETE', data }) },
  upload(url, filePath, formData = {}) {
    const token = localStorage.getItem('token')
    return fetch(BASE_URL + url, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ file: filePath, ...formData })
    }).then(r => r.json())
  }
}

export default api
