<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('植享家 App 启动')
})
</script>

<style lang="scss">
/* 全局样式 */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #F5F7F5;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #2E3B2E;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 移动端容器 */
#app {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* 重置 */
view, text, image, scroll-view, swiper, swiper-item, button, input, textarea {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 通用工具类 */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.text-center { text-align: center; }
.text-primary { color: #4CAF50; }
.text-secondary { color: #8B9A8B; }
.text-hint { color: #B0BEB0; font-size: 13px; }
.text-ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* uni-app 兼容标签 */
view { display: block; }
text { display: inline; }
image { display: inline-block; }
scroll-view { display: block; overflow: auto; }
swiper { display: block; overflow: hidden; }
swiper-item { display: block; }
</style>
