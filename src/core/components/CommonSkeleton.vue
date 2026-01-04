<script setup lang="ts">
export interface CommonSkeletonProps {
  type?: 'card' | 'list' | 'text'
}

withDefaults(defineProps<CommonSkeletonProps>(), {
  type: 'text'
})
</script>

<template>
  <!-- Text Skeleton -->
  <div
    v-if="type === 'text'"
    class="animate-pulse space-y-2"
  >
    <div class="h-4 w-3/4 rounded bg-gray-200" />
    <div class="h-4 w-1/2 rounded bg-gray-200" />
  </div>

  <!-- List Skeleton -->
  <div
    v-else-if="type === 'list'"
    class="animate-pulse space-y-3"
  >
    <div
      v-for="i in 3"
      :key="i"
      class="flex items-center space-x-4"
    >
      <div class="h-10 w-10 rounded-full bg-gray-200" />
      <div class="flex-1 space-y-2">
        <div class="h-4 w-3/4 rounded bg-gray-200" />
        <div class="h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  </div>

  <!-- Card Skeleton -->
  <div
    v-else-if="type === 'card'"
    class="animate-pulse rounded-lg border border-gray-200 p-4"
  >
    <div class="mb-4 h-32 rounded bg-gray-200" />
    <div class="space-y-2">
      <div class="h-4 w-3/4 rounded bg-gray-200" />
      <div class="h-4 w-1/2 rounded bg-gray-200" />
    </div>
  </div>
</template>
