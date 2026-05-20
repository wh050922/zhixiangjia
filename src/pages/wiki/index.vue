<template>
  <view class="wiki-page">
    <!-- 搜索栏 -->
    <view class="wiki__search">
      <view class="wiki__search-bar">
        <text class="wiki__search-icon">🔍</text>
        <input
          class="wiki__search-input"
          v-model="keyword"
          placeholder="搜索5000+植物品种..."
          placeholder-style="color: #B0BEB0"
          @confirm="onSearch"
        />
      </view>
    </view>

    <!-- 分类导航 -->
    <scroll-view class="wiki__categories" scroll-x :show-scrollbar="false">
      <view
        v-for="(cat, i) in categories"
        :key="i"
        class="wiki__cat-item"
        :class="{ 'wiki__cat-item--active': activeCategory === i }"
        @click="activeCategory = i"
      >
        <text class="wiki__cat-icon">{{ cat.icon }}</text>
        <text class="wiki__cat-text">{{ cat.name }}</text>
      </view>
    </scroll-view>

    <!-- 植物列表 -->
    <view class="wiki__list">
      <view v-for="plant in filteredPlants" :key="plant.id" class="wiki__card">
        <image class="wiki__card-img" :src="plant.image" mode="aspectFill" />
        <view class="wiki__card-info">
          <text class="wiki__card-name">{{ plant.name }}</text>
          <text class="wiki__card-latin">{{ plant.latin }}</text>
          <view class="wiki__card-tags">
            <text class="wiki__card-tag">{{ plant.category }}</text>
            <text class="wiki__card-tag" v-if="plant.level === 'easy'">新手友好</text>
          </view>
          <text class="wiki__card-desc">{{ plant.desc }}</text>
        </view>
        <text class="wiki__card-heart" :class="{ 'wiki__card-heart--liked': plant.liked }">♡</text>
      </view>

      <view v-if="filteredPlants.length === 0" class="wiki__empty">
        <text class="wiki__empty-icon">🌿</text>
        <text class="wiki__empty-text">暂无相关植物，换个关键词试试</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const keyword = ref('')
const activeCategory = ref(0)

const categories = ref([
  { name: '全部', icon: '🌿' },
  { name: '观花植物', icon: '🌸' },
  { name: '绿叶植物', icon: '🪴' },
  { name: '多肉植物', icon: '🌵' },
  { name: '阳台蔬菜', icon: '🥬' },
  { name: '时令水果', icon: '🍓' },
  { name: '药用植物', icon: '💊' }
])

// Mock 数据
const plants = ref([
  { id: 1, name: '月季', latin: 'Rosa chinensis', category: '观花植物', level: 'easy', desc: '喜光耐寒，四季开花，适合阳台盆栽', image: '/static/plants/yueji.png', liked: false },
  { id: 2, name: '绿萝', latin: 'Epipremnum aureum', category: '绿叶植物', level: 'easy', desc: '耐阴好养，净化空气，新手入门首选', image: '/static/plants/lvluo.png', liked: false },
  { id: 3, name: '多肉桃蛋', latin: 'Sedum cv. Peach', category: '多肉植物', level: 'easy', desc: '喜光耐旱，粉嫩可爱，适合窗台摆放', image: '/static/plants/taodan.png', liked: false },
  { id: 4, name: '小番茄', latin: 'Solanum lycopersicum', category: '阳台蔬菜', level: 'easy', desc: '阳台盆栽可种，60天收获，孩子最爱', image: '/static/plants/fanqie.png', liked: false },
  { id: 5, name: '茉莉花', latin: 'Jasminum sambac', category: '观花植物', level: 'medium', desc: '花香浓郁，喜光喜湿，夏季开花不断', image: '/static/plants/moli.png', liked: false },
  { id: 6, name: '龟背竹', latin: 'Monstera deliciosa', category: '绿叶植物', level: 'easy', desc: '网红绿植，耐阴易养，叶片独特有格调', image: '/static/plants/guibeizhu.png', liked: false }
])

const filteredPlants = computed(() => {
  let result = plants.value
  const cat = categories.value[activeCategory.value]
  if (cat.name !== '全部') {
    result = result.filter(p => p.category === cat.name)
  }
  if (keyword.value) {
    result = result.filter(p => p.name.includes(keyword.value) || p.latin.toLowerCase().includes(keyword.value.toLowerCase()))
  }
  return result
})

function onSearch() {
  // 搜索逻辑
}
</script>

<style lang="scss" scoped>
.wiki-page {
  background: #F5F7F5;
  min-height: 100vh;
}

.wiki__search {
  padding: 12px 14px;
  background: #FFFFFF;

  &-bar {
    display: flex;
    align-items: center;
    background: #F5F7F5;
    border-radius: 22px;
    padding: 9px 14px;
  }

  &-icon { font-size: 16px; margin-right: 8px; }
  &-input { flex: 1; font-size: 15px; color: #2E3B2E; }
}

.wiki__categories {
  white-space: nowrap;
  padding: 12px 14px;
  background: #FFFFFF;
  border-bottom: 0.5px solid #F0F0F0;
}

.wiki__cat-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 14px;
  margin-right: 6px;
  border-radius: 10px;
  transition: all 0.2s;

  &--active {
    background: #E8F5E9;
  }
}

.wiki__cat-icon { font-size: 18px; margin-bottom: 3px; }
.wiki__cat-text { font-size: 13px; color: #5A6B5A; }

.wiki__list { padding: 12px 14px; }

.wiki__card {
  display: flex;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 10px rgba(76, 175, 80, 0.06);
  position: relative;

  &-img {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    background: #E8F5E9;
    flex-shrink: 0;
    margin-right: 12px;
  }

  &-info { flex: 1; overflow: hidden; }
  &-name { font-size: 16px; font-weight: 600; color: #2E3B2E; display: block; margin-bottom: 3px; }
  &-latin { font-size: 12px; color: #B0BEB0; font-style: italic; display: block; margin-bottom: 5px; }
  &-tags { display: flex; gap: 5px; margin-bottom: 5px; }
  &-tag { font-size: 12px; color: #4CAF50; background: #E8F5E9; padding: 3px 8px; border-radius: 4px; }
  &-desc { font-size: 13px; color: #8B9A8B; display: block; }
  &-heart {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    color: #B0BEB0;
    &--liked { color: #E57373; }
  }
}

.wiki__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  &-icon { font-size: 48px; margin-bottom: 10px; }
  &-text { color: #8B9A8B; font-size: 15px; }
}
</style>
