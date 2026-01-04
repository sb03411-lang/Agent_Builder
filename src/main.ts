import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/styles/index.css'

import { useAuthStore } from '@/stores/auth.store'
import { useUiStore } from '@/stores/ui.store'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize stores
const authStore = useAuthStore()
const uiStore = useUiStore()
authStore.initialize()
uiStore.initializeTheme()

app.mount('#app')
