<template>
  <view class="space-page">
    <!-- 介绍区 -->
    <view class="space__intro">
      <text class="space__intro-title">🏠 空间智能匹配</text>
      <text class="space__intro-desc">上传户型图，AI 智能分析居家空间，精准推荐每处位置的适配植物</text>
    </view>

    <!-- 上传区域 -->
    <view class="space__upload" @click="uploadImage">
      <view class="space__upload-box" v-if="!imagePath">
        <text class="space__upload-icon">📤</text>
        <text class="space__upload-text">上传户型图</text>
        <text class="space__upload-tip">支持 JPG / PNG 格式，也可选择手绘户型</text>
      </view>
      <image v-else class="space__upload-preview" :src="imagePath" mode="aspectFit" />
    </view>

    <!-- 补充信息 -->
    <view class="space__form" v-if="imagePath">
      <view class="space__form-title">补充环境参数（可选）</view>

      <view class="space__form-group">
        <text class="space__form-label">地区</text>
        <picker mode="region" @change="onRegionChange">
          <view class="space__form-picker">
            <text :class="{ 'space__form-placeholder': !region[0] }">
              {{ region[0] ? region.join(' - ') : '请选择所在地区' }}
            </text>
            <text class="space__form-arrow">></text>
          </view>
        </picker>
      </view>

      <view class="space__form-group">
        <text class="space__form-label">室内通风</text>
        <view class="space__form-options">
          <view
            v-for="opt in ventilationOptions"
            :key="opt"
            class="space__form-option"
            :class="{ 'space__form-option--active': ventilation === opt }"
            @click="ventilation = opt"
          >
            <text>{{ opt }}</text>
          </view>
        </view>
      </view>

      <view class="space__form-group">
        <text class="space__form-label">室内湿度</text>
        <view class="space__form-options">
          <view
            v-for="opt in humidityOptions"
            :key="opt"
            class="space__form-option"
            :class="{ 'space__form-option--active': humidity === opt }"
            @click="humidity = opt"
          >
            <text>{{ opt }}</text>
          </view>
        </view>
      </view>

      <!-- 提交分析 -->
      <view class="space__submit" @click="analyze">
        <text class="space__submit-text">开始智能分析</text>
      </view>
    </view>

    <!-- 分析结果 Demo -->
    <view class="space__result" v-if="showResult">
      <text class="space__result-title">📊 全屋环境分析报告</text>

      <view v-for="room in analysisRooms" :key="room.name" class="space__room-card">
        <view class="space__room-header">
          <text class="space__room-name">{{ room.name }}</text>
          <text class="space__room-score">适配指数 {{ room.score }}%</text>
        </view>
        <view class="space__room-plants">
          <text class="space__room-label">推荐植物：</text>
          <text>{{ room.plants.join('、') }}</text>
        </view>
        <view class="space__room-tip">
          <text class="space__room-label">摆放建议：</text>
          <text>{{ room.tip }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const imagePath = ref('')
const region = ref([])
const ventilation = ref('良好')
const humidity = ref('适中')
const showResult = ref(false)

const ventilationOptions = ref(['差', '一般', '良好', '优秀'])
const humidityOptions = ref(['干燥', '适中', '湿润'])

const analysisRooms = ref([
  { name: '客厅', score: 95, plants: ['龟背竹', '琴叶榕', '虎皮兰'], tip: '靠窗位置摆放大叶植物，电视柜旁用虎皮兰点缀' },
  { name: '阳台', score: 92, plants: ['月季', '茉莉', '蓝雪花', '多肉组合'], tip: '朝南阳台光照充足，打造小型花园，注意夏季遮阳' },
  { name: '卧室', score: 88, plants: ['绿萝', '常春藤', '薰衣草'], tip: '窗台摆放小型绿植，避免夜间释放CO2过多的植物' },
  { name: '书房', score: 90, plants: ['文竹', '吊兰', '富贵竹'], tip: '书桌旁放文竹，书架顶层放垂吊植物' },
  { name: '卫生间', score: 78, plants: ['蕨类植物', '白鹤芋', '绿萝'], tip: '利用高湿度环境养蕨类，注意通风防霉' }
])

const onRegionChange = (e) => {
  region.value = e.detail.value
}

function uploadImage() {
  uni.chooseImage({
    count: 1,
    sourceType: ['album', 'camera'],
    success(res) {
      imagePath.value = res.tempFilePaths[0]
      showResult.value = false
    }
  })
}

function analyze() {
  uni.showToast({ title: 'AI 分析中...', icon: 'loading' })
  setTimeout(() => {
    showResult.value = true
    uni.hideToast()
    uni.showToast({ title: '分析完成！', icon: 'success' })
  }, 2000)
}
</script>

<style lang="scss" scoped>
.space-page { background: #F5F7F5; min-height: 100vh; padding: 14px; }

.space__intro {
  margin-bottom: 14px;
  padding: 14px;

  &-title { display: block; font-size: 18px; font-weight: 700; color: #2E3B2E; margin-bottom: 6px; }
  &-desc { font-size: 14px; color: #8B9A8B; line-height: 1.7; }
}

.space__upload {
  margin-bottom: 14px;
}

.space__upload-box {
  background: #FFFFFF;
  border: 1px dashed #A5D6A7;
  border-radius: 10px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.space__upload-icon { font-size: 36px; margin-bottom: 10px; }
.space__upload-text { font-size: 16px; color: #4CAF50; font-weight: 500; margin-bottom: 6px; }
.space__upload-tip { font-size: 13px; color: #B0BEB0; }

.space__upload-preview {
  width: 100%;
  height: 260px;
  border-radius: 10px;
  background: #FFFFFF;
}

.space__form {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 16px 14px;
  margin-bottom: 14px;

  &-title { font-size: 16px; font-weight: 600; color: #2E3B2E; margin-bottom: 12px; }
}

.space__form-group {
  margin-bottom: 12px;

  &:last-of-type { margin-bottom: 0; }
}

.space__form-label {
  font-size: 14px;
  color: #5A6B5A;
  margin-bottom: 8px;
  display: block;
}

.space__form-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F5F7F5;
  border-radius: 8px;
  padding: 12px 10px;
  font-size: 14px;
}

.space__form-placeholder { color: #B0BEB0; }
.space__form-arrow { color: #B0BEB0; font-size: 16px; }

.space__form-options {
  display: flex;
  gap: 10px;
}

.space__form-option {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: #F5F7F5;
  border-radius: 8px;
  font-size: 13px;
  color: #5A6B5A;

  &--active { background: #E8F5E9; color: #4CAF50; font-weight: 500; }
}

.space__submit {
  margin-top: 16px;
  background: linear-gradient(135deg, #66BB6A, #4CAF50);
  border-radius: 10px;
  padding: 14px;
  text-align: center;

  &:active { opacity: 0.9; }

  &-text { font-size: 17px; color: #FFFFFF; font-weight: 600; }
}

.space__result {
  &-title { display: block; font-size: 17px; font-weight: 700; color: #2E3B2E; margin-bottom: 12px; }
}

.space__room-card {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 10px;
  box-shadow: 0 1px 10px rgba(76, 175, 80, 0.06);
}

.space__room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.space__room-name {
  font-size: 16px;
  font-weight: 600;
  color: #2E3B2E;
}

.space__room-score {
  font-size: 13px;
  color: #4CAF50;
  background: #E8F5E9;
  padding: 3px 10px;
  border-radius: 12px;
}

.space__room-plants, .space__room-tip {
  font-size: 14px;
  color: #5A6B5A;
  line-height: 1.7;
}

.space__room-label {
  color: #8D6E63;
  font-weight: 500;
}
</style>
