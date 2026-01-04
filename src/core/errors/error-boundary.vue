<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((error: Error) => {
  hasError.value = true
  errorMessage.value = error.message || '알 수 없는 오류가 발생했습니다.'
  console.error('[ErrorBoundary]', error)
  return false
})

const handleRetry = () => {
  hasError.value = false
  errorMessage.value = ''
}
</script>

<template>
  <div
    v-if="hasError"
    class="flex min-h-[400px] flex-col items-center justify-center p-8"
  >
    <div class="text-center">
      <div class="mb-4 text-6xl">!</div>
      <h2 class="mb-2 text-xl font-semibold text-gray-900">
        문제가 발생했습니다
      </h2>
      <p class="mb-6 text-gray-600">
        {{ errorMessage }}
      </p>
      <button
        type="button"
        class="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        @click="handleRetry"
      >
        다시 시도
      </button>
    </div>
  </div>
  <slot v-else />
</template>
