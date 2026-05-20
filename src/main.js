import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './common/uni-compat.js'
import uniComponents from './common/uni-components.js'
import NavBar from './components/NavBar.vue'
import ModuleCard from './components/ModuleCard.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(uniComponents)
app.component('c-nav-bar', NavBar)
app.component('c-module-card', ModuleCard)
app.mount('#app')
