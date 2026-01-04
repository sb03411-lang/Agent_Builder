<script setup lang="ts">
import { computed } from 'vue'

export interface CommonInputProps {
  modelValue?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel'
  placeholder?: string
  error?: string
  disabled?: boolean
  id?: string
}

const props = withDefaults(defineProps<CommonInputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  error: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputClasses = computed(() => {
  const baseClasses =
    'block w-full rounded-lg border px-4 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100'

  if (props.error) {
    return `${baseClasses} border-red-500 focus:border-red-500 focus:ring-red-500`
  }

  return `${baseClasses} border-gray-300 focus:border-primary-500 focus:ring-primary-500`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="handleInput"
    />
    <p
      v-if="error"
      class="mt-1 text-sm text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>
