<script setup lang="ts">
import type { Component } from 'vue'

export interface StatCardProps {
  title: string
  value: string | number
  icon?: Component
  trend?: {
    value: number
    isPositive: boolean
  }
}

defineProps<StatCardProps>()
</script>

<template>
  <div class="rounded-xl bg-white p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">
          {{ title }}
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ value }}
        </p>
        <p
          v-if="trend"
          class="mt-2 text-sm"
          :class="trend.isPositive ? 'text-green-600' : 'text-red-600'"
        >
          {{ trend.isPositive ? '+' : '' }}{{ trend.value }}%
          <span class="text-gray-500">vs last month</span>
        </p>
      </div>
      <div
        v-if="icon"
        class="rounded-lg bg-primary-100 p-3"
      >
        <component
          :is="icon"
          class="h-6 w-6 text-primary-600"
        />
      </div>
    </div>
  </div>
</template>
