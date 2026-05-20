<template>
  <view class="user-page">
    <!-- 用户头部 -->
    <view class="user__header">
      <view class="user__header-bg" />
      <view class="user__info">
        <image class="user__avatar" :src="userStore.avatar" mode="aspectFill" />
        <view class="user__detail">
          <text class="user__name">{{ userStore.nickname }}</text>
          <text class="user__id">ID: {{ userStore.userInfo?._id || '未登录' }}</text>
        </view>
        <view class="user__edit-btn" @click="handleLogin">
          <text>{{ userStore.isLogin ? '编辑' : '登录' }}</text>
        </view>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="user__stats">
      <view class="user__stat-item">
        <text class="user__stat-num">{{ userStore.isLogin ? stats.plants : '-' }}</text>
        <text class="user__stat-label">我的植物</text>
      </view>
      <view class="user__stat-item">
        <text class="user__stat-num">{{ userStore.isLogin ? stats.notes : '-' }}</text>
        <text class="user__stat-label">养护笔记</text>
      </view>
      <view class="user__stat-item">
        <text class="user__stat-num">{{ userStore.isLogin ? stats.orders : '-' }}</text>
        <text class="user__stat-label">我的订单</text>
      </view>
      <view class="user__stat-item">
        <text class="user__stat-num">{{ userStore.isLogin ? stats.likes : '-' }}</text>
        <text class="user__stat-label">获赞</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="user__menu">
      <view v-for="group in menus" :key="group.title" class="user__menu-group">
        <text class="user__menu-title">{{ group.title }}</text>
        <view v-for="item in group.items" :key="item.name" class="user__menu-item" @click="navigateTo(item.url)">
          <text class="user__menu-icon">{{ item.icon }}</text>
          <text class="user__menu-text">{{ item.name }}</text>
          <text class="user__menu-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view v-if="userStore.isLogin" class="user__logout" @click="userStore.logout()">
      <text>退出登录</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const stats = ref({ plants: 12, notes: 36, orders: 5, likes: 128 })

const menus = ref([
  {
    title: '我的园艺',
    items: [
      { name: '我的植物', icon: '🌱', url: '/pages/plants/index' },
      { name: '养护日历', icon: '📅', url: '' },
      { name: '成长档案', icon: '📸', url: '' },
      { name: '识别历史', icon: '🔍', url: '' }
    ]
  },
  {
    title: '交易管理',
    items: [
      { name: '我的订单', icon: '📦', url: '' },
      { name: '收货地址', icon: '📍', url: '' },
      { name: '助农订单', icon: '🌾', url: '' }
    ]
  },
  {
    title: '其他',
    items: [
      { name: '联系客服', icon: '💬', url: '' },
      { name: '设置', icon: '⚙️', url: '' },
      { name: '关于植享家', icon: 'ℹ️', url: '' }
    ]
  }
])

function handleLogin() {
  if (!userStore.isLogin) {
    // 微信登录
    uni.showToast({ title: '微信一键登录中...', icon: 'loading' })
    setTimeout(() => {
      userStore.setToken('mock_token')
      userStore.setUserInfo({ _id: 'user_001', nickname: '植享家用户' })
    }, 1000)
  }
}

function navigateTo(url) {
  if (url) uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.user-page { background: #F5F7F5; min-height: 100vh; }

.user__header {
  position: relative;
  padding: 24px 14px 34px;

  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 160px;
    background: linear-gradient(135deg, #66BB6A, #388E3C);
    border-radius: 0 0 24px 24px;
  }
}

.user__info {
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 22px;
  z-index: 1;
}

.user__avatar {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: #E8F5E9;
  margin-right: 14px;
}

.user__detail { flex: 1; }
.user__name { display: block; font-size: 20px; font-weight: 600; color: #FFFFFF; margin-bottom: 4px; }
.user__id { font-size: 13px; color: rgba(255, 255, 255, 0.7); }

.user__edit-btn {
  padding: 6px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: transparent;

  text { font-size: 14px; color: #FFFFFF; }

  &:active { background: rgba(255, 255, 255, 0.15); }
}

.user__stats {
  display: flex;
  margin: -18px 14px 12px;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 16px 0;
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.1);
  position: relative;
  z-index: 2;
}

.user__stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    border-right: 0.5px solid #F0F0F0;
  }
}

.user__stat-num { font-size: 20px; font-weight: 700; color: #4CAF50; margin-bottom: 3px; }
.user__stat-label { font-size: 13px; color: #8B9A8B; }

.user__menu { padding: 0 14px; }

.user__menu-group { margin-bottom: 14px; }

.user__menu-title {
  font-size: 13px;
  color: #B0BEB0;
  padding: 0 4px 8px;
  display: block;
}

.user__menu-item {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  padding: 15px 12px;
  border-radius: 10px;
  margin-bottom: 1px;

  &:active { background: #F5F7F5; }
}

.user__menu-icon { font-size: 18px; margin-right: 10px; }
.user__menu-text { flex: 1; font-size: 15px; color: #2E3B2E; }
.user__menu-arrow { font-size: 16px; color: #B0BEB0; }

.user__logout {
  margin: 24px 14px;
  padding: 14px;
  background: #FFFFFF;
  border-radius: 10px;
  text-align: center;

  text { font-size: 15px; color: #E57373; }

  &:active { background: #FFEBEE; }
}
</style>
