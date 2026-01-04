<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div class="text-xl font-bold text-primary-600">
          AI Agent Builder
        </div>
        <nav class="flex items-center gap-4">
          <router-link
            to="/login"
            class="text-gray-600 hover:text-gray-900"
          >
            로그인
          </router-link>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t bg-white py-6">
      <div class="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        © 2024 AI Agent Builder. All rights reserved.
      </div>
    </footer>
  </div>
</template>
