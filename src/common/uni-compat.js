/**
 * uni-app API → 浏览器兼容层
 * 全局挂载为 window.uni，供页面调用
 */

function navigateTo({ url }) {
  const path = url
    .replace('/pages/', '/')
    .replace('/index', '')
  window.location.hash = '#' + path
}

function getStorageSync(key) {
  try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
}
function setStorageSync(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function removeStorageSync(key) {
  localStorage.removeItem(key)
}

function showToast({ title, icon = 'success', duration = 1500 }) {
  const icons = { success: '✅', loading: '⏳', error: '❌', none: '' }
  const div = document.createElement('div')
  div.textContent = `${icons[icon] || ''} ${title}`
  Object.assign(div.style, {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)', zIndex: '99999',
    background: 'rgba(0,0,0,0.78)', color: '#fff',
    padding: '16rpx 36rpx', borderRadius: '12rpx',
    fontSize: '14px', pointerEvents: 'none',
    whiteSpace: 'nowrap'
  })
  document.body.appendChild(div)
  setTimeout(() => { div.remove() }, duration)
}

function showModal({ title, content, confirmText, success }) {
  const ok = window.confirm(`${title}\n\n${content}`)
  if (success) success({ confirm: ok, cancel: !ok })
}

function showActionSheet({ itemList, success }) {
  const msg = itemList.map((item, i) => `${i + 1}. ${item}`).join('\n')
  const choice = window.prompt(`输入序号:\n${msg}`)
  if (choice && success) {
    const idx = parseInt(choice) - 1
    if (idx >= 0 && idx < itemList.length) success({ tapIndex: idx })
  }
}

function chooseImage({ count, sourceType, success }) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const files = Array.from(e.target.files).slice(0, count || 1)
    Promise.all(files.map(f => new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(f)
    }))).then(tempFilePaths => {
      if (success) success({ tempFilePaths })
    })
  }
  input.click()
}

function getSystemInfoSync() {
  return {
    statusBarHeight: 0,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    platform: 'h5'
  }
}

function reLaunch({ url }) {
  window.location.hash = '#' + url.replace('/pages/', '/').replace('/index', '')
  window.location.reload()
}

function uploadFile({ url, filePath, name, formData, success, fail, header }) {
  // filePath is a dataURL from chooseImage
  fetch(url, {
    method: 'POST',
    headers: { ...(header || {}) },
    body: JSON.stringify({ file: filePath, name, ...formData })
  })
    .then(r => r.json())
    .then(data => { if (success) success({ data: JSON.stringify(data) }) })
    .catch(err => { if (fail) fail(err) })
}

window.uni = {
  navigateTo,
  getStorageSync,
  setStorageSync,
  removeStorageSync,
  showToast,
  showModal,
  showActionSheet,
  chooseImage,
  getSystemInfoSync,
  reLaunch,
  uploadFile
}

export default window.uni
