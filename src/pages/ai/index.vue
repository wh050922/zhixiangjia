<template>
  <view class="ai-page">
    <!-- 识别区域 -->
    <view class="ai__hero">
      <view class="ai__hero-bg">
        <text class="ai__hero-title">AI 植物识别</text>
        <text class="ai__hero-desc">拍照识别 · 病虫害诊断 · 养护开方</text>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="ai__actions">
      <view class="ai__action-card" @click="takePhoto">
        <view class="ai__action-icon" style="background: #E8F5E9">
          <text>📸</text>
        </view>
        <text class="ai__action-title">拍照识别</text>
        <text class="ai__action-desc">识别植物品种</text>
      </view>
      <view class="ai__action-card" @click="pickFromAlbum">
        <view class="ai__action-icon" style="background: #FFF3E0">
          <text>🖼️</text>
        </view>
        <text class="ai__action-title">相册识别</text>
        <text class="ai__action-desc">上传图片识别</text>
      </view>
      <view class="ai__action-card" @click="diagnoseDisease">
        <view class="ai__action-icon" style="background: #FFEBEE">
          <text>🔬</text>
        </view>
        <text class="ai__action-title">病虫害诊断</text>
        <text class="ai__action-desc">植物状态分析</text>
      </view>
    </view>

    <!-- 识别历史 -->
    <view class="ai__section" v-if="history.length > 0">
      <view class="ai__section-header">
        <text class="ai__section-title">识别历史</text>
        <text class="ai__section-clear" @click="clearHistory">清空</text>
      </view>
      <view class="ai__history-list">
        <view v-for="item in history" :key="item.id" class="ai__history-item">
          <image class="ai__history-img" :src="item.image" mode="aspectFill" />
          <view class="ai__history-info">
            <text class="ai__history-name">{{ item.name }}</text>
            <text class="ai__history-time">{{ item.time }}</text>
          </view>
          <text class="ai__history-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="ai__empty">
      <text class="ai__empty-icon">🌿</text>
      <text class="ai__empty-text">还没有识别记录</text>
      <text class="ai__empty-tip">拍照或上传植物图片，AI 帮您快速识别</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const history = ref([])

function takePhoto() {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    success(res) {
      uni.showToast({ title: '识别中...', icon: 'loading' })
      // 模拟识别结果
      setTimeout(() => {
        uni.showModal({
          title: '识别结果',
          content: '月季（Rosa chinensis）\n科属：蔷薇科 · 蔷薇属\n花语：纯洁的爱',
          confirmText: '查看详情',
          success(modalRes) {
            if (modalRes.confirm) {
              uni.navigateTo({ url: '/pages/wiki/index' })
            }
          }
        })
      }, 1500)
    }
  })
}

function pickFromAlbum() {
  uni.chooseImage({
    count: 1,
    sourceType: ['album'],
    success(res) {
      uni.showToast({ title: '识别中...', icon: 'loading' })
    }
  })
}

function diagnoseDisease() {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera', 'album'],
    success(res) {
      uni.showToast({ title: '诊断中...', icon: 'loading' })
    }
  })
}

function clearHistory() {
  uni.showModal({
    title: '提示',
    content: '确定清空所有识别历史吗？',
    success(res) {
      if (res.confirm) history.value = []
    }
  })
}
</script>

<style lang="scss" scoped>
.ai-page { background: #F5F7F5; min-height: 100vh; }

.ai__hero {
  margin: 12px 14px;
  &-bg {
    background: linear-gradient(135deg, #66BB6A, #2E7D32);
    border-radius: 12px;
    padding: 28px 20px;
    text-align: center;
  }
  &-title { display: block; font-size: 24px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
  &-desc { display: block; font-size: 14px; color: rgba(255, 255, 255, 0.9); }
}

.ai__actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 0 14px;
  margin-bottom: 14px;
}

.ai__action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 18px 10px;
  box-shadow: 0 1px 10px rgba(76, 175, 80, 0.06);

  &:active { transform: scale(0.96); }
}

.ai__action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  text { font-size: 22px; }
}

.ai__action-title { font-size: 15px; font-weight: 600; color: #2E3B2E; margin-bottom: 3px; }
.ai__action-desc { font-size: 12px; color: #B0BEB0; }

.ai__section { padding: 0 14px; }
.ai__section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.ai__section-title { font-size: 17px; font-weight: 600; color: #2E3B2E; }
.ai__section-clear { font-size: 14px; color: #B0BEB0; }

.ai__history-item {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 8px rgba(76, 175, 80, 0.04);

  &-img { width: 48px; height: 48px; border-radius: 8px; background: #E8F5E9; margin-right: 12px; }
  &-info { flex: 1; }
  &-name { display: block; font-size: 15px; font-weight: 500; color: #2E3B2E; margin-bottom: 3px; }
  &-time { font-size: 12px; color: #B0BEB0; }
  &-arrow { font-size: 16px; color: #B0BEB0; }
}

.ai__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  &-icon { font-size: 54px; margin-bottom: 12px; }
  &-text { font-size: 15px; color: #8B9A8B; margin-bottom: 6px; }
  &-tip { font-size: 13px; color: #B0BEB0; }
}
</style>
