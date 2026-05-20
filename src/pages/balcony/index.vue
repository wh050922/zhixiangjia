<template>
  <view class="balcony-page">
    <!-- 头部介绍 -->
    <view class="balcony__hero">
      <text class="balcony__hero-icon">🥬</text>
      <text class="balcony__hero-title">阳台种菜专属指导</text>
      <text class="balcony__hero-desc">从种到收，全流程保姆级陪伴</text>
    </view>

    <!-- 信息填写卡片 -->
    <view class="balcony__card">
      <text class="balcony__card-title">📋 定制你的种植方案</text>

      <view class="balcony__form-item">
        <text class="balcony__label">阳台朝向</text>
        <view class="balcony__options">
          <view
            v-for="opt in orientations"
            :key="opt"
            class="balcony__option"
            :class="{ 'balcony__option--active': form.orientation === opt }"
            @click="form.orientation = opt"
          ><text>{{ opt }}</text></view>
        </view>
      </view>

      <view class="balcony__form-item">
        <text class="balcony__label">可用面积</text>
        <view class="balcony__options">
          <view
            v-for="opt in areas"
            :key="opt"
            class="balcony__option"
            :class="{ 'balcony__option--active': form.area === opt }"
            @click="form.area = opt"
          ><text>{{ opt }}</text></view>
        </view>
      </view>

      <view class="balcony__form-item">
        <text class="balcony__label">种植经验</text>
        <view class="balcony__options">
          <view
            v-for="opt in experiences"
            :key="opt"
            class="balcony__option"
            :class="{ 'balcony__option--active': form.experience === opt }"
            @click="form.experience = opt"
          ><text>{{ opt }}</text></view>
        </view>
      </view>

      <view class="balcony__form-item">
        <text class="balcony__label">所在地区</text>
        <picker mode="region" @change="onRegionChange">
          <view class="balcony__picker">
            <text :class="{ 'balcony__placeholder': !form.region[0] }">
              {{ form.region[0] ? form.region.join(' - ') : '请选择地区' }}
            </text>
            <text>></text>
          </view>
        </picker>
      </view>

      <view class="balcony__generate" @click="generatePlan">
        <text>生成种植方案</text>
      </view>
    </view>

    <!-- 新手专区 -->
    <view class="balcony__section">
      <text class="balcony__section-title">🌱 新手专区</text>
      <view class="balcony__guide-list">
        <view v-for="item in beginnerGuides" :key="item.title" class="balcony__guide-item">
          <text class="balcony__guide-icon">{{ item.icon }}</text>
          <view class="balcony__guide-info">
            <text class="balcony__guide-title">{{ item.title }}</text>
            <text class="balcony__guide-desc">{{ item.desc }}</text>
          </view>
          <text class="balcony__guide-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 种菜日历 -->
    <view class="balcony__section">
      <text class="balcony__section-title">📅 种菜日历</text>
      <view class="balcony__calendar">
        <view v-for="(mo, i) in calendarMonths" :key="i" class="balcony__month">
          <text class="balcony__month-name">{{ mo.name }}</text>
          <text class="balcony__month-tasks">{{ mo.tasks }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

const orientations = ['朝南', '朝东', '朝西', '朝北']
const areas = ['1㎡以下', '1-3㎡', '3-5㎡', '5㎡以上']
const experiences = ['新手', '进阶']

const form = reactive({
  orientation: '朝南',
  area: '1-3㎡',
  experience: '新手',
  region: []
})

const onRegionChange = (e) => {
  form.region = e.detail.value
}

const beginnerGuides = ref([
  { icon: '🎯', title: '新手入门种植推荐', desc: '最容易成功的5种阳台蔬菜' },
  { icon: '⚠️', title: '常见踩坑避坑指南', desc: '浇水过多、光照不足…这些坑别踩' },
  { icon: '❓', title: '新手常见问题Q&A', desc: '种子不发芽？叶子发黄？一一解答' }
])

const calendarMonths = ref([
  { name: '3月', tasks: '播种：小番茄、辣椒、茄子' },
  { name: '4月', tasks: '播种：黄瓜、豆角；移栽春苗' },
  { name: '5月', tasks: '追肥、搭架、授粉' },
  { name: '6月', tasks: '采收春播蔬菜，注意防虫' }
])

function generatePlan() {
  if (!form.region[0]) {
    uni.showToast({ title: '请先选择所在地区', icon: 'none' })
    return
  }
  uni.showToast({ title: 'AI 生成方案中...', icon: 'loading' })
  setTimeout(() => {
    uni.showToast({ title: '方案已生成！', icon: 'success' })
  }, 1500)
}
</script>

<style lang="scss" scoped>
.balcony-page { background: #F5F7F5; min-height: 100vh; padding: 14px; }

.balcony__hero {
  text-align: center;
  padding: 24px 0 18px;

  &-icon { font-size: 44px; display: block; margin-bottom: 10px; }
  &-title { display: block; font-size: 20px; font-weight: 700; color: #2E3B2E; margin-bottom: 6px; }
  &-desc { font-size: 14px; color: #8B9A8B; }
}

.balcony__card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px 14px;
  margin-bottom: 14px;
  box-shadow: 0 1px 10px rgba(76, 175, 80, 0.08);

  &-title { font-size: 16px; font-weight: 600; color: #2E3B2E; display: block; margin-bottom: 14px; }
}

.balcony__form-item { margin-bottom: 14px; }
.balcony__label { font-size: 14px; color: #5A6B5A; display: block; margin-bottom: 8px; }

.balcony__options { display: flex; gap: 10px; }

.balcony__option {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: #F5F7F5;
  border-radius: 8px;
  font-size: 14px;
  color: #5A6B5A;

  &--active { background: #E8F5E9; color: #4CAF50; font-weight: 500; }
}

.balcony__picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F5F7F5;
  border-radius: 8px;
  padding: 12px 10px;
  font-size: 14px;
  color: #5A6B5A;
}

.balcony__placeholder { color: #B0BEB0; }

.balcony__generate {
  background: linear-gradient(135deg, #66BB6A, #4CAF50);
  border-radius: 10px;
  padding: 14px;
  text-align: center;

  text { font-size: 17px; color: #FFFFFF; font-weight: 600; }

  &:active { opacity: 0.9; }
}

.balcony__section {
  margin-bottom: 14px;

  &-title { display: block; font-size: 16px; font-weight: 600; color: #2E3B2E; margin-bottom: 10px; }
}

.balcony__guide-item {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 8px;
  box-shadow: 0 1px 8px rgba(76, 175, 80, 0.04);

  &:active { background: #F5F7F5; }
}

.balcony__guide-icon { font-size: 22px; margin-right: 10px; }
.balcony__guide-info { flex: 1; }
.balcony__guide-title { display: block; font-size: 15px; font-weight: 500; color: #2E3B2E; margin-bottom: 3px; }
.balcony__guide-desc { font-size: 13px; color: #8B9A8B; }
.balcony__guide-arrow { font-size: 16px; color: #B0BEB0; }

.balcony__calendar {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 12px;
}

.balcony__month {
  padding: 12px 8px;

  &:not(:last-child) {
    border-bottom: 0.5px solid #F0F0F0;
  }
}

.balcony__month-name {
  font-size: 15px;
  font-weight: 600;
  color: #4CAF50;
  display: block;
  margin-bottom: 5px;
}

.balcony__month-tasks {
  font-size: 14px;
  color: #5A6B5A;
  line-height: 1.7;
}
</style>
