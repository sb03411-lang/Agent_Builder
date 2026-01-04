<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import CommonInput from '@/core/components/CommonInput.vue'
import CommonButton from '@/core/components/CommonButton.vue'

const emit = defineEmits<{
  submit: [data: { email: string; password: string }]
}>()

defineProps<{
  loading?: boolean
}>()

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(6, '비밀번호는 6자 이상이어야 합니다.')
  })
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: loginSchema
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(values => {
  emit('submit', {
    email: values.email,
    password: values.password
  })
})
</script>

<template>
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
      :loading="loading"
    >
      로그인
    </CommonButton>
  </form>
</template>
