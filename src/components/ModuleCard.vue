<template>
  <view class="module-card" :class="{ 'module-card--featured': featured }" @click="handleClick">
    <view class="module-card__icon-wrapper" :style="{ background: iconBg }">
      <image v-if="iconSrc" class="module-card__icon-img" :src="iconSrc" mode="aspectFit" />
      <text v-else class="module-card__icon">{{ icon }}</text>
    </view>
    <view class="module-card__content">
      <text class="module-card__title">{{ title }}</text>
      <text class="module-card__desc">{{ desc }}</text>
    </view>
    <view v-if="badge" class="module-card__badge">
      <text class="module-card__badge-text">{{ badge }}</text>
    </view>
    <text class="module-card__arrow">></text>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconSrc: { type: String, default: '' },
  iconBg: { type: String, default: '#E8F5E9' },
  badge: { type: String, default: '' },
  featured: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<style lang="scss" scoped>
.module-card {
  display: flex;
  align-items: center;
  padding: 16px 14px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.08);
  margin-bottom: 10px;
  position: relative;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
  }

  &--featured {
    border: 1px solid #A5D6A7;
    box-shadow: 0 2px 14px rgba(76, 175, 80, 0.15);
  }

  &__icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 12px;
  }

  &__icon {
    font-size: 22px;
  }

  &__icon-img {
    width: 32px;
    height: 32px;
  }

  &__content {
    flex: 1;
    overflow: hidden;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #2E3B2E;
    display: block;
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 13px;
    color: #8B9A8B;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__badge {
    background: linear-gradient(135deg, #FF9800, #FFB74D);
    border-radius: 10px;
    padding: 3px 10px;
    margin-right: 6px;

    &-text {
      font-size: 12px;
      color: #FFFFFF;
      font-weight: 500;
    }
  }

  &__arrow {
    font-size: 16px;
    color: #B0BEB0;
    font-weight: 300;
  }
}
</style>
