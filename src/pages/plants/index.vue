<template>
  <view class="plants-page">
    <!-- 顶部操作 -->
    <view class="plants__header">
      <text class="plants__title">我的植物</text>
      <view class="plants__add-btn" @click="addPlant">
        <text>+ 添加植物</text>
      </view>
    </view>

    <!-- 分组标签 -->
    <scroll-view class="plants__groups" scroll-x :show-scrollbar="false">
      <view
        v-for="(group, i) in groups"
        :key="i"
        class="plants__group-tab"
        :class="{ 'plants__group-tab--active': activeGroup === i }"
        @click="activeGroup = i"
      >
        <text>{{ group.name }}</text>
      </view>
    </scroll-view>

    <!-- 植物卡片列表 -->
    <view class="plants__list" v-if="myPlants.length > 0">
      <view v-for="plant in myPlants" :key="plant.id" class="plants__card">
        <image class="plants__card-img" :src="plant.image" mode="aspectFill" />
        <view class="plants__card-info">
          <view class="plants__card-top">
            <text class="plants__card-name">{{ plant.name }}</text>
            <text class="plants__card-status" :class="'plants__card-status--' + plant.health">
              {{ healthMap[plant.health] }}
            </text>
          </view>
          <text class="plants__card-meta">{{ plant.variety }} · {{ plant.location }}</text>
          <view class="plants__card-tasks">
            <text class="plants__card-task" v-for="task in plant.todayTasks" :key="task">
              {{ task }}
            </text>
          </view>
          <text class="plants__card-date">养护 {{ plant.days }} 天 · 购买于 {{ plant.buyDate }}</text>
        </view>
        <text class="plants__card-arrow">></text>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="plants__empty">
      <text class="plants__empty-icon">🪴</text>
      <text class="plants__empty-text">还没有添加植物</text>
      <text class="plants__empty-tip">点击"添加植物"开始管理你的绿植吧</text>
      <view class="plants__empty-btn" @click="addPlant">
        <text>添加第一株植物</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeGroup = ref(0)
const groups = ref([
  { name: '全部' },
  { name: '阳台多肉组' },
  { name: '客厅观叶组' },
  { name: '卧室绿植组' }
])

const healthMap = { good: '健康', warning: '需关注', bad: '异常' }

const myPlants = ref([
  {
    id: 1, name: '桃蛋', variety: '多肉植物', location: '阳台',
    health: 'good', days: 180, buyDate: '2023-12-01',
    image: '/static/plants/taodan.png',
    todayTasks: ['💧 适量浇水', '☀️ 晒太阳'],
    group: '阳台多肉组'
  },
  {
    id: 2, name: '绿萝', variety: '观叶植物', location: '客厅',
    health: 'good', days: 365, buyDate: '2023-06-01',
    image: '/static/plants/lvluo.png',
    todayTasks: ['💧 浇水', '🌫️ 叶面喷水'],
    group: '客厅观叶组'
  },
  {
    id: 3, name: '月季', variety: '观花植物', location: '阳台',
    health: 'warning', days: 90, buyDate: '2024-03-01',
    image: '/static/plants/yueji.png',
    todayTasks: ['✂️ 修剪枯叶', '🔍 检查虫害'],
    group: '阳台多肉组'
  }
])

function addPlant() {
  uni.showActionSheet({
    itemList: ['拍照识别添加', '手动输入添加'],
    success(res) {
      if (res.tapIndex === 0) {
        uni.navigateTo({ url: '/pages/ai/index' })
      } else {
        uni.showToast({ title: '功能开发中', icon: 'none' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.plants-page { background: #F5F7F5; min-height: 100vh; }

.plants__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: #FFFFFF;
}

.plants__title { font-size: 18px; font-weight: 700; color: #2E3B2E; }

.plants__add-btn {
  background: #4CAF50;
  border-radius: 18px;
  padding: 8px 16px;

  text { font-size: 14px; color: #FFFFFF; font-weight: 500; }

  &:active { opacity: 0.85; }
}

.plants__groups {
  white-space: nowrap;
  padding: 12px 14px;
  background: #FFFFFF;
  border-bottom: 0.5px solid #F0F0F0;
}

.plants__group-tab {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 18px;
  font-size: 14px;
  color: #5A6B5A;
  background: #F5F7F5;
  margin-right: 8px;

  &--active { background: #E8F5E9; color: #4CAF50; font-weight: 500; }
}

.plants__list { padding: 12px 14px; }

.plants__card {
  display: flex;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 10px;
  box-shadow: 0 1px 10px rgba(76, 175, 80, 0.06);
  align-items: center;

  &-img { width: 64px; height: 64px; border-radius: 10px; background: #E8F5E9; margin-right: 12px; flex-shrink: 0; }
  &-info { flex: 1; overflow: hidden; }
  &-top { display: flex; align-items: center; margin-bottom: 5px; }
  &-name { font-size: 16px; font-weight: 600; color: #2E3B2E; margin-right: 8px; }
  &-status { font-size: 12px; padding: 3px 8px; border-radius: 8px;
    &--good { background: #E8F5E9; color: #4CAF50; }
    &--warning { background: #FFF3E0; color: #FF9800; }
    &--bad { background: #FFEBEE; color: #E57373; }
  }
  &-meta { display: block; font-size: 13px; color: #8B9A8B; margin-bottom: 5px; }
  &-tasks { display: flex; gap: 8px; margin-bottom: 4px; }
  &-task { font-size: 12px; color: #5A6B5A; }
  &-date { font-size: 12px; color: #B0BEB0; }
  &-arrow { font-size: 16px; color: #B0BEB0; margin-left: 6px; }
}

.plants__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;

  &-icon { font-size: 64px; margin-bottom: 14px; }
  &-text { font-size: 16px; color: #8B9A8B; margin-bottom: 6px; }
  &-tip { font-size: 13px; color: #B0BEB0; margin-bottom: 24px; }
  &-btn {
    background: #4CAF50;
    border-radius: 22px;
    padding: 12px 28px;

    text { font-size: 16px; color: #FFFFFF; }

    &:active { opacity: 0.85; }
  }
}
</style>
