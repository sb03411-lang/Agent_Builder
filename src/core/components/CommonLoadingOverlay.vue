<script setup lang="ts">
import CommonSpinner from './CommonSpinner.vue'

export interface CommonLoadingOverlayProps {
  show: boolean
}

defineProps<CommonLoadingOverlayProps>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div class="rounded-lg bg-white p-6 shadow-xl">
          <CommonSpinner size="lg" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
