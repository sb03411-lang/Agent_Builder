<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import CommonInput from '@/core/components/CommonInput.vue'
import CommonButton from '@/core/components/CommonButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/core/composables/useToast'
import { useLoading } from '@/core/composables/useLoading'
import { authApi } from '@/api/auth.api'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const { isLoading, withLoading } = useLoading()

const registerSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(1, '이름을 입력해주세요.').min(2, '이름은 2자 이상이어야 합니다.'),
      email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
      password: z
        .string()
        .min(1, '비밀번호를 입력해주세요.')
        .min(6, '비밀번호는 6자 이상이어야 합니다.'),
      passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.')
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordConfirm']
    })
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: registerSchema
})

const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')
const [passwordConfirm] = defineField('passwordConfirm')

const onSubmit = handleSubmit(async values => {
  await withLoading(async () => {
    try {
      const response = await authApi.register({
        name: values.name,
        email: values.email,
        password: values.password
      })

      authStore.login(response.data.user, response.data.token)
      toast.success('회원가입이 완료되었습니다.')
      router.push('/dashboard')
    } catch (error) {
      toast.error('회원가입에 실패했습니다.')
    }
  })
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md">
      <div class="rounded-2xl bg-white p-8 shadow-lg">
        <h1 class="mb-8 text-center text-2xl font-bold text-gray-900">
          회원가입
        </h1>

        <form
          class="space-y-6"
          @submit="onSubmit"
        >
          <div>
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <CommonInput
              id="name"
              v-model="name"
              type="text"
              placeholder="이름을 입력하세요"
              :error="errors.name"
            />
          </div>

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

          <div>
            <label
              for="passwordConfirm"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <CommonInput
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              :error="errors.passwordConfirm"
            />
          </div>

          <CommonButton
            type="submit"
            class="w-full"
            :loading="isLoading"
          >
            회원가입
          </CommonButton>
        </form>

        <p class="mt-6 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <router-link
            to="/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            로그인
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
