<template>
  <view class="shop-page">
    <!-- 顶部导航 -->
    <view class="shop__tabs">
      <view
        v-for="(tab, i) in tabs"
        :key="i"
        class="shop__tab"
        :class="{ 'shop__tab--active': activeTab === i }"
        @click="activeTab = i"
      >
        <text>{{ tab }}</text>
      </view>
    </view>

    <!-- 吕梁助农专区 Banner -->
    <view class="shop__rural-banner">
      <view class="shop__rural-content">
        <text class="shop__rural-title">🌾 吕梁助农专区</text>
        <text class="shop__rural-desc">基地直供 · 农户增收 · 用户得实惠</text>
      </view>
      <text class="shop__rural-arrow">></text>
    </view>

    <!-- 商品列表 -->
    <view class="shop__list">
      <view v-for="product in products" :key="product.id" class="shop__card">
        <image class="shop__card-img" :src="product.image" mode="aspectFill" />
        <view class="shop__card-info">
          <text class="shop__card-name">{{ product.name }}</text>
          <text class="shop__card-origin">{{ product.origin }}</text>
          <view class="shop__card-price">
            <text class="shop__card-price-current">¥{{ product.price }}</text>
            <text class="shop__card-price-origin">¥{{ product.marketPrice }}</text>
          </view>
          <view class="shop__card-footer">
            <text class="shop__card-tag" v-if="product.isRural">助农订单</text>
            <text class="shop__card-sold">{{ product.sold }}人已购</text>
          </view>
        </view>
        <view class="shop__card-buy" @click="addToCart(product)">
          <text>🛒</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
const tabs = ref(['全部', '花卉苗木', '蔬果种子', '有机肥料', '园艺工具', '吕梁专区'])

const products = ref([
  { id: 1, name: '精品月季苗 三年大苗', origin: '山西吕梁·张庄花卉基地', price: 29.9, marketPrice: 59.9, sold: 1286, isRural: true, image: '/static/products/yueji.png' },
  { id: 2, name: '有机营养土 5斤装', origin: '山西吕梁·李家沟合作社', price: 19.9, marketPrice: 39.9, sold: 3560, isRural: true, image: '/static/products/tu.png' },
  { id: 3, name: '阳台种菜新手套餐', origin: '山西吕梁·助农优选', price: 39.9, marketPrice: 79.9, sold: 892, isRural: true, image: '/static/products/caizhong.png' },
  { id: 4, name: '多肉植物组合 6盆装', origin: '云南昆明·澄江花卉', price: 49.9, marketPrice: 99.9, sold: 2150, isRural: false, image: '/static/products/duorou.png' }
])

function addToCart(product) {
  uni.showToast({ title: `已添加「${product.name}」`, icon: 'success' })
}
</script>

<style lang="scss" scoped>
.shop-page { background: #F5F7F5; min-height: 100vh; }

.shop__tabs {
  display: flex;
  background: #FFFFFF;
  padding: 10px 14px;
  white-space: nowrap;
  overflow-x: auto;

  &::-webkit-scrollbar { display: none; }
}

.shop__tab {
  padding: 8px 16px;
  border-radius: 18px;
  font-size: 14px;
  color: #5A6B5A;
  background: #F5F7F5;
  margin-right: 8px;
  flex-shrink: 0;

  &--active { background: #4CAF50; color: #FFFFFF; font-weight: 500; }
}

.shop__rural-banner {
  display: flex;
  align-items: center;
  margin: 12px 14px;
  padding: 16px 14px;
  background: linear-gradient(135deg, #EFEBE9, #FFF8E1);
  border-radius: 10px;
  border: 1px solid #C9B99A;

  &-content { flex: 1; }
  &-title { display: block; font-size: 16px; font-weight: 600; color: #5D4037; margin-bottom: 4px; }
  &-desc { font-size: 13px; color: #8D6E63; }
  &-arrow { font-size: 18px; color: #8D6E63; }
}

.shop__list { padding: 0 14px; }

.shop__card {
  display: flex;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 10px rgba(76, 175, 80, 0.06);
  position: relative;

  &-img { width: 100px; height: 100px; border-radius: 8px; background: #E8F5E9; margin-right: 12px; flex-shrink: 0; }
  &-info { flex: 1; overflow: hidden; }
  &-name { display: block; font-size: 15px; font-weight: 600; color: #2E3B2E; margin-bottom: 3px; }
  &-origin { display: block; font-size: 12px; color: #B0BEB0; margin-bottom: 5px; }

  &-price {
    display: flex;
    align-items: baseline;
    margin-bottom: 5px;

    &-current { font-size: 18px; font-weight: 700; color: #E57373; margin-right: 6px;
      &::before { content: '¥'; font-size: 13px; }
    }
    &-origin { font-size: 13px; color: #B0BEB0; text-decoration: line-through; }
  }

  &-footer { display: flex; align-items: center; }
  &-tag { font-size: 12px; color: #8D6E63; background: #EFEBE9; padding: 3px 8px; border-radius: 4px; margin-right: 8px; }
  &-sold { font-size: 12px; color: #B0BEB0; }

  &-buy {
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #4CAF50;
    display: flex;
    align-items: center;
    justify-content: center;

    text { font-size: 16px; }

    &:active { transform: scale(0.9); }
  }
}
</style>
