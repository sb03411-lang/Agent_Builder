<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useUiStore } from '@/stores/ui.store'
import CommonLoadingOverlay from '@/core/components/CommonLoadingOverlay.vue'

const route = useRoute()
const uiStore = useUiStore()

const layouts = {
  DefaultLayout: defineAsyncComponent(
    () => import('@/core/layouts/DefaultLayout.vue')
  ),
  AuthLayout: defineAsyncComponent(
    () => import('@/core/layouts/AuthLayout.vue')
  ),
  DashboardLayout: defineAsyncComponent(
    () => import('@/core/layouts/DashboardLayout.vue')
  )
}

const currentLayout = computed(() => {
  const layoutName = (route.meta.layout as keyof typeof layouts) || 'DefaultLayout'
  return layouts[layoutName]
})
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>

  <CommonLoadingOverlay :show="uiStore.isGlobalLoading" />
  <Toaster
    position="top-right"
    :duration="3000"
    rich-colors
    close-button
  />
</template>
