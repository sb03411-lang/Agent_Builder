<script setup lang="ts">
import { computed } from 'vue'
import {
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth.store'
import StatCard from '@/components/dashboard/StatCard.vue'

const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || '사용자')

const stats = [
  {
    title: '총 사용자',
    value: '1,234',
    icon: UsersIcon,
    trend: { value: 12, isPositive: true }
  },
  {
    title: '활성 프로젝트',
    value: '56',
    icon: DocumentTextIcon,
    trend: { value: 8, isPositive: true }
  },
  {
    title: '이번 달 수익',
    value: '₩2,450,000',
    icon: CurrencyDollarIcon,
    trend: { value: 3, isPositive: false }
  },
  {
    title: '전환율',
    value: '24.5%',
    icon: ChartBarIcon,
    trend: { value: 5, isPositive: true }
  }
]
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        안녕하세요, {{ userName }}님!
      </h1>
      <p class="mt-1 text-gray-600">
        오늘의 대시보드 현황을 확인하세요.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
      />
    </div>

    <div class="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-gray-900">
        최근 활동
      </h2>
      <p class="text-gray-600">
        아직 표시할 활동이 없습니다.
      </p>
    </div>
  </div>
</template>
