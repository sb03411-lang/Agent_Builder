import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark' | 'system'

export const useUiStore = defineStore('ui', () => {
  const isGlobalLoading = ref(false)
  const sidebarOpen = ref(true)
  const theme = ref<Theme>('light')

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setGlobalLoading = (loading: boolean) => {
    isGlobalLoading.value = loading
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  const initializeTheme = () => {
    const storedTheme = localStorage.getItem('theme') as Theme | null
    if (storedTheme) {
      theme.value = storedTheme
    }
  }

  return {
    isGlobalLoading,
    sidebarOpen,
    theme,
    toggleSidebar,
    setGlobalLoading,
    setTheme,
    initializeTheme
  }
})
