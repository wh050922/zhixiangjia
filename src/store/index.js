import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
    isLogin: false
  }),

  getters: {
    nickname: (state) => state.userInfo?.nickname || '植享家用户',
    avatar: (state) => state.userInfo?.avatar || '/static/default-avatar.png'
  },

  actions: {
    setToken(token) {
      this.token = token
      uni.setStorageSync('token', token)
    },

    setUserInfo(info) {
      this.userInfo = info
      this.isLogin = true
    },

    logout() {
      this.token = ''
      this.userInfo = null
      this.isLogin = false
      uni.removeStorageSync('token')
      uni.reLaunch({ url: '/pages/index/index' })
    }
  }
})

export const useGardenStore = defineStore('garden', {
  state: () => ({
    myPlants: [],
    plantHistory: [],
    aiHistory: []
  }),

  actions: {
    addPlant(plant) {
      this.myPlants.push(plant)
    },
    removePlant(id) {
      this.myPlants = this.myPlants.filter(p => p._id !== id)
    },
    addAiHistory(item) {
      this.aiHistory.unshift(item)
    }
  }
})
