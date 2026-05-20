<template>
  <view class="home">
    <!-- 顶部导航栏 -->
    <c-nav-bar show-slogan />

    <!-- 可滚动内容区 -->
    <scroll-view class="home__scroll" scroll-y enhanced :show-scrollbar="false">
      <!-- Hero Banner -->
      <view class="home__banner">
        <swiper class="home__swiper" circular autoplay interval="4000">
          <swiper-item v-for="(item, i) in banners" :key="i">
            <view
              class="home__swiper-item"
              :style="{ background: item.bg }"
              @click="navigateTo(item.url)"
            >
              <view class="home__swiper-text">
                <text class="home__swiper-title">{{ item.title }}</text>
                <text class="home__swiper-desc">{{ item.desc }}</text>
              </view>
              <text class="home__swiper-icon">{{ item.icon }}</text>
            </view>
          </swiper-item>
        </swiper>
        <!-- 轮播指示器 -->
        <view class="home__dots">
          <view
            v-for="(_, i) in banners"
            :key="i"
            class="home__dot"
            :class="{ 'home__dot--active': i === currentBanner }"
          />
        </view>
      </view>

      <!-- 快速入口 - 4个常用功能 -->
      <view class="home__quick">
        <view
          v-for="item in quickEntries"
          :key="item.title"
          class="home__quick-item"
          @click="navigateTo(item.url)"
        >
          <view class="home__quick-icon" :style="{ background: item.bg }">
            <text>{{ item.icon }}</text>
          </view>
          <text class="home__quick-text">{{ item.title }}</text>
        </view>
      </view>

      <!-- 核心功能模块 -->
      <view class="home__section">
        <view class="home__section-header">
          <text class="home__section-title">核心功能</text>
          <text class="home__section-sub">一站式园艺服务</text>
        </view>

        <c-module-card
          v-for="(mod, i) in modules"
          :key="i"
          :title="mod.title"
          :desc="mod.desc"
          :icon="mod.icon"
          :icon-src="mod.iconSrc"
          :icon-bg="mod.iconBg"
          :badge="mod.badge"
          :featured="mod.featured"
          @click="navigateTo(mod.url)"
        />
      </view>

      <!-- 吕梁助农专区 -->
      <view class="home__section">
        <view class="home__section-header">
          <text class="home__section-title">吕梁助农专区</text>
          <text class="home__section-sub">基地直供，农户增收</text>
        </view>
        <view class="home__rural" @click="navigateTo('/pages/shop/index')">
          <view class="home__rural-content">
            <text class="home__rural-title">山西吕梁直供好物</text>
            <text class="home__rural-desc">优质花卉苗木 · 蔬果种子 · 有机肥料 · 地方特产</text>
            <view class="home__rural-tag">
              <text class="home__rural-tag-text">助农订单</text>
            </view>
          </view>
          <text class="home__rural-icon">🌾</text>
        </view>
      </view>

      <!-- 底部安全距离 -->
      <view style="height: 80px" />
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const currentBanner = ref(0)

const banners = ref([
  {
    title: '空间智能匹配',
    desc: '拍照识别户型，精准推荐绿植摆放方案',
    icon: '🏠',
    bg: 'linear-gradient(135deg, #66BB6A, #388E3C)',
    url: '/pages/space/index'
  },
  {
    title: 'AI 植物识别',
    desc: '拍照识花，一秒知花名、懂养护',
    icon: '📸',
    bg: 'linear-gradient(135deg, #43A047, #2E7D32)',
    url: '/pages/ai/index'
  },
  {
    title: '阳台种菜指南',
    desc: '从种到收全流程指导，新手也能种',
    icon: '🥬',
    bg: 'linear-gradient(135deg, #8D6E63, #5D4037)',
    url: '/pages/balcony/index'
  }
])

const quickEntries = ref([
  { title: 'AI识花', icon: '📷', bg: '#E8F5E9', url: '/pages/ai/index' },
  { title: '植物百科', icon: '📖', bg: '#FFF3E0', url: '/pages/wiki/index' },
  { title: '我的植物', icon: '🌱', bg: '#E8F5E9', url: '/pages/plants/index' },
  { title: '助农商城', icon: '🛒', bg: '#FFF3E0', url: '/pages/shop/index' }
])

const modules = ref([
  {
    title: '空间智能匹配',
    desc: '户型识别 · 全屋分析报告 · 四季摆放方案',
    icon: '🏠',
    iconSrc: '',
    iconBg: '#E8F5E9',
    badge: '核心',
    featured: true,
    url: '/pages/space/index'
  },
  {
    title: '我的植物管理',
    desc: '养护日历 · 健康诊断 · 成长档案 · 批量管理',
    icon: '',
    iconSrc: '/static/我的植物.png',
    iconBg: '#F1F8E9',
    url: '/pages/plants/index'
  },
  {
    title: '植物百科大全',
    desc: '5000+品种 · 完整养护指南 · 图文短视频',
    icon: '📚',
    iconSrc: '',
    iconBg: '#FFF3E0',
    url: '/pages/wiki/index'
  },
  {
    title: 'AI 植物识别',
    desc: '拍照识别 · 病虫害诊断 · 一键添加养护',
    icon: '🔍',
    iconSrc: '',
    iconBg: '#E3F2FD',
    url: '/pages/ai/index'
  },
  {
    title: '阳台种菜指导',
    desc: '个性化种植方案 · 全流程指导 · 种菜日历',
    icon: '',
    iconSrc: '/static/阳台种菜.png',
    iconBg: '#FFF8E1',
    url: '/pages/balcony/index'
  },
  {
    title: '乡村助农直供',
    desc: '基地直供 · 吕梁专区 · 农户赋能 · 产地溯源',
    icon: '🌾',
    iconSrc: '',
    iconBg: '#EFEBE9',
    url: '/pages/shop/index'
  }
])

function navigateTo(url) {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: #F5F7F5;

  &__scroll {
    height: calc(100vh - 88px);
  }

  /* Banner 区域 */
  &__banner {
    margin: 10px 14px;
    position: relative;
  }

  &__swiper {
    border-radius: 12px;
    overflow: hidden;
    height: 180px;
  }

  &__swiper-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
  }

  &__swiper-text {
    flex: 1;
  }

  &__swiper-title {
    display: block;
    font-size: 22px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 8px;
  }

  &__swiper-desc {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
  }

  &__swiper-icon {
    font-size: 54px;
    margin-left: 12px;
  }

  &__dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #C8E6C9;
    margin: 0 4px;
    transition: all 0.3s;

    &--active {
      width: 14px;
      border-radius: 3px;
      background: #4CAF50;
    }
  }

  /* 快速入口 */
  &__quick {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 14px;
  }

  &__quick-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 1px 10px rgba(76, 175, 80, 0.06);

    &:active {
      transform: scale(0.96);
    }
  }

  &__quick-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;

    text {
      font-size: 20px;
    }
  }

  &__quick-text {
    font-size: 13px;
    color: #2E3B2E;
    font-weight: 500;
  }

  /* 区块标题 */
  &__section {
    padding: 0 14px;
    margin-bottom: 4px;
  }

  &__section-header {
    display: flex;
    align-items: baseline;
    margin-bottom: 12px;
    padding-top: 10px;
  }

  &__section-title {
    font-size: 18px;
    font-weight: 700;
    color: #2E3B2E;
    margin-right: 8px;
  }

  &__section-sub {
    font-size: 13px;
    color: #8B9A8B;
  }

  /* 助农专区卡片 */
  &__rural {
    display: flex;
    align-items: center;
    padding: 18px 16px;
    background: linear-gradient(135deg, #EFEBE9 0%, #FFF8E1 100%);
    border-radius: 10px;
    border: 1px solid #C9B99A;
    margin-bottom: 10px;

    &:active {
      opacity: 0.9;
    }
  }

  &__rural-content {
    flex: 1;
  }

  &__rural-title {
    display: block;
    font-size: 17px;
    font-weight: 600;
    color: #5D4037;
    margin-bottom: 6px;
  }

  &__rural-desc {
    display: block;
    font-size: 14px;
    color: #8D6E63;
    margin-bottom: 8px;
  }

  &__rural-tag {
    display: inline-block;
    background: #8D6E63;
    border-radius: 10px;
    padding: 3px 12px;

    &-text {
      font-size: 12px;
      color: #FFFFFF;
    }
  }

  &__rural-icon {
    font-size: 44px;
    margin-left: 10px;
  }
}
</style>
