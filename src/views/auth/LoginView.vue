<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import CommonInput from '@/core/components/CommonInput.vue'
import CommonButton from '@/core/components/CommonButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/core/composables/useToast'
import { useLoading } from '@/core/composables/useLoading'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()
const { isLoading, withLoading } = useLoading()

// TODO: 백엔드 연동 후 원복 필요
// const isDev = import.meta.env.VITE_APP_ENV === 'development'
const isDev = true

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(1, '비밀번호를 입력해주세요.').min(6, '비밀번호는 6자 이상이어야 합니다.')
  })
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: loginSchema
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async values => {
  await withLoading(async () => {
    // 개발 환경에서는 목업 로그인
    if (isDev) {
      const mockUser = {
        id: '1',
        email: values.email,
        name: values.email.split('@')[0]
      }
      authStore.login(mockUser, 'mock-token-12345')
      toast.success('로그인되었습니다. (개발 모드)')

      const redirect = route.query.redirect as string
      router.push(redirect || '/dashboard')
      return
    }

    // 프로덕션 환경에서는 실제 API 호출
    toast.error('백엔드 서버가 연결되지 않았습니다.')
  })
})

// 개발 모드 빠른 로그인
const handleDevLogin = () => {
  const mockUser = {
    id: '1',
    email: 'dev@example.com',
    name: '개발자'
  }
  authStore.login(mockUser, 'mock-token-12345')
  toast.success('개발 모드로 로그인되었습니다.')
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md">
      <div class="rounded-2xl bg-white p-8 shadow-lg">
        <h1 class="mb-8 text-center text-2xl font-bold text-gray-900">
          로그인
        </h1>

        <form
          class="space-y-6"
          @submit="onSubmit"
        >
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <CommonInput
              id="email"
              v-model="email"
              type="email"
              placeholder="이메일을 입력하세요"
              :error="errors.email"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <CommonInput
              id="password"
              v-model="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              :error="errors.password"
            />
          </div>

          <CommonButton
            type="submit"
            class="w-full"
            :loading="isLoading"
          >
            로그인
          </CommonButton>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          계정이 없으신가요?
          <router-link
            to="/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            회원가입
          </router-link>
        </p>

        <!-- 개발 모드 빠른 로그인 버튼 -->
        <div
          v-if="isDev"
          class="mt-6 border-t pt-6"
        >
          <p class="mb-3 text-center text-xs text-gray-500">
            개발 모드
          </p>
          <CommonButton
            variant="secondary"
            class="w-full"
            @click="handleDevLogin"
          >
            빠른 로그인 (개발용)
          </CommonButton>
        </div>
      </div>
    </div>
  </div>
</template>
