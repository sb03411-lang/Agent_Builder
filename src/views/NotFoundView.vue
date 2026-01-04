<script setup lang="ts">
import { useRouter } from 'vue-router'
import CommonButton from '@/core/components/CommonButton.vue'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="mb-4 text-6xl font-bold text-gray-900">404</h1>
    <p class="mb-8 text-xl text-gray-600">페이지를 찾을 수 없습니다.</p>
    <CommonButton @click="handleGoHome">
      홈으로 돌아가기
    </CommonButton>
  </div>
</template>
