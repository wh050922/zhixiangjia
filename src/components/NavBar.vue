<template>
  <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="navbar__inner">
      <view class="navbar__left">
        <image
          v-if="showLogo"
          class="navbar__logo"
          src="/static/logo.jpg"
          mode="aspectFit"
        />
        <text v-if="showLogo" class="navbar__brand">植享家</text>
      </view>
      <view class="navbar__center">
        <text class="navbar__title" v-if="title">{{ title }}</text>
      </view>
      <view class="navbar__right">
        <slot name="right"></slot>
      </view>
    </view>
    <view class="navbar__slogan" v-if="showSlogan && showLogo">
      <text class="navbar__slogan-text">让美好园艺走进千家万户</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, default: '' },
  showLogo: { type: Boolean, default: true },
  showSlogan: { type: Boolean, default: false }
})

const statusBarHeight = ref(0)

try {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 20
} catch (e) {
  statusBarHeight.value = 20
}
</script>

<style lang="scss" scoped>
.navbar {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  padding: 0 14px 10px;
  color: #FFFFFF;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
  }

  &__left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__logo {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    margin-right: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  &__brand {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  &__center {
    flex: 1;
    text-align: center;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
  }

  &__right {
    flex-shrink: 0;
    min-width: 44px;
    display: flex;
    justify-content: flex-end;
  }

  &__slogan {
    text-align: center;
    padding-top: 2px;

    &-text {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.85);
      letter-spacing: 2px;
    }
  }
}
</style>
