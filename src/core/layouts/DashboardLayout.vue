<script setup lang="ts">
import { computed } from 'vue'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui.store'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || '사용자')

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: HomeIcon },
  { name: '사용자 관리', href: '/users', icon: UsersIcon },
  { name: '설정', href: '/settings', icon: Cog6ToothIcon }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200"
      :class="uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-16 items-center justify-between border-b px-4">
        <span class="text-xl font-bold text-primary-600">AI Agent Builder</span>
        <button
          type="button"
          class="rounded-lg p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          @click="uiStore.toggleSidebar"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <nav class="mt-4 px-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          active-class="bg-primary-50 text-primary-700"
        >
          <component
            :is="item.icon"
            class="h-5 w-5"
          />
          {{ item.name }}
        </router-link>
      </nav>
    </aside>

    <!-- Main content -->
    <div
      class="transition-all duration-200"
      :class="uiStore.sidebarOpen ? 'lg:ml-64' : ''"
    >
      <!-- Header -->
      <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
        <button
          type="button"
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          @click="uiStore.toggleSidebar"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>

        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-700">{{ userName }}</span>
          <button
            type="button"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="handleLogout"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5" />
            로그아웃
          </button>
        </div>
      </header>

      <!-- Page content -->
      <main>
        <slot />
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="uiStore.sidebarOpen"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
      @click="uiStore.toggleSidebar"
    />
  </div>
</template>
