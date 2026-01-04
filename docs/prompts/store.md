# Pinia 스토어 생성 프롬프트 템플릿

> 새로운 Pinia 스토어를 생성할 때 사용하는 템플릿입니다.

---

## 📋 템플릿

```
{도메인} 스토어를 생성해줘.

### 기본 정보
- 파일명: {도메인}.store.ts
- 위치: src/stores/{도메인}.store.ts
- 스토어 ID: {store_id}

### State
{state_목록}

### Getters
{getters_목록}

### Actions
{actions_목록}

### 의존성
{의존성_목록}

### 참고
- Composition API 스타일 (setup store) 사용
- CLAUDE.md 스토어 패턴 따라줘
```

---

## 📝 예시 1: 기본 CRUD 스토어

```
product 스토어를 생성해줘.

### 기본 정보
- 파일명: product.store.ts
- 위치: src/stores/product.store.ts
- 스토어 ID: product

### State
- products: Product[] (상품 목록)
- currentProduct: Product | null (현재 선택된 상품)
- isLoading: boolean
- error: string | null
- pagination: { page: number, limit: number, total: number }
- filters: { search: string, category: string | null }

### Getters
- productCount: 상품 개수
- hasProducts: 상품 존재 여부
- filteredProducts: 필터링된 상품 목록 (로컬 필터링)

### Actions
- fetchProducts(): 상품 목록 조회 (필터, 페이지네이션 적용)
- fetchProductById(id): 단일 상품 조회
- createProduct(data): 상품 생성
- updateProduct(id, data): 상품 수정
- deleteProduct(id): 상품 삭제
- setFilters(filters): 필터 설정
- setPage(page): 페이지 변경
- resetFilters(): 필터 초기화

### 의존성
- productApi (src/api/product.api.ts)
- useToast (에러/성공 알림)

### 참고
- API 호출 시 에러 처리, 로딩 상태 관리
- 목록 조회 후 자동으로 로딩 상태 해제
```

---

## 📝 예시 2: 폼/위저드 스토어

```
checkout 스토어를 생성해줘.

### 기본 정보
- 파일명: checkout.store.ts
- 위치: src/stores/checkout.store.ts
- 스토어 ID: checkout

### State
- currentStep: number (현재 단계, 1-4)
- cartItems: CartItem[] (장바구니 상품)
- shippingInfo: ShippingInfo | null (배송 정보)
- paymentInfo: PaymentInfo | null (결제 정보)
- isProcessing: boolean (주문 처리 중)
- orderResult: Order | null (주문 완료 결과)

### Getters
- totalAmount: 총 금액 계산
- itemCount: 상품 수량 합계
- canProceed: 다음 단계 진행 가능 여부 (현재 단계 유효성)
- stepValidation: 각 단계별 유효성 상태 객체

### Actions
- nextStep(): 다음 단계로 (유효성 검사 후)
- prevStep(): 이전 단계로
- goToStep(step): 특정 단계로 이동
- setShippingInfo(info): 배송 정보 설정
- setPaymentInfo(info): 결제 정보 설정
- addItem(item): 상품 추가
- removeItem(itemId): 상품 제거
- updateQuantity(itemId, quantity): 수량 변경
- submitOrder(): 주문 제출
- reset(): 전체 초기화

### 의존성
- orderApi
- useToast

### 참고
- 단계별 유효성 검사 로직 포함
- 주문 완료 후 상태 초기화 옵션
```

---

## 📝 예시 3: 설정/환경 스토어

```
settings 스토어를 생성해줘.

### 기본 정보
- 파일명: settings.store.ts
- 위치: src/stores/settings.store.ts
- 스토어 ID: settings

### State
- theme: 'light' | 'dark' | 'system'
- language: 'ko' | 'en'
- notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
- tableSettings: {
    perPage: number
    density: 'compact' | 'normal' | 'comfortable'
  }

### Getters
- isDarkMode: 실제 다크모드 여부 (system 고려)
- currentLocale: 현재 로케일 객체

### Actions
- setTheme(theme): 테마 변경 + localStorage 저장 + document class 적용
- setLanguage(lang): 언어 변경 + localStorage 저장
- setNotification(type, value): 알림 설정 변경
- setTableSettings(settings): 테이블 설정 변경
- initialize(): localStorage에서 설정 복원
- reset(): 기본값으로 초기화

### 의존성
- 없음 (순수 클라이언트 상태)

### 참고
- localStorage 동기화
- 테마 변경 시 document.documentElement.classList 조작
- system 테마는 prefers-color-scheme 미디어 쿼리 사용
```

---

## 📝 예시 4: 실시간/WebSocket 스토어

```
notification 스토어를 생성해줘.

### 기본 정보
- 파일명: notification.store.ts
- 위치: src/stores/notification.store.ts
- 스토어 ID: notification

### State
- notifications: Notification[] (알림 목록)
- unreadCount: number (읽지 않은 알림 수)
- isConnected: boolean (WebSocket 연결 상태)
- connectionError: string | null

### Getters
- hasUnread: 읽지 않은 알림 존재 여부
- recentNotifications: 최근 5개 알림
- groupedByDate: 날짜별 그룹화된 알림

### Actions
- connect(): WebSocket 연결
- disconnect(): WebSocket 연결 해제
- fetchNotifications(): 알림 목록 조회 (HTTP)
- markAsRead(id): 읽음 처리
- markAllAsRead(): 전체 읽음 처리
- deleteNotification(id): 알림 삭제
- addNotification(notification): 새 알림 추가 (WebSocket 수신 시)

### 의존성
- notificationApi
- WebSocket 클래스/라이브러리

### 참고
- WebSocket 재연결 로직 포함
- 앱 시작 시 자동 연결
- 컴포넌트 언마운트 시 연결 유지 (전역 상태)
```

---

## 🔧 스토어 기본 구조

```typescript
// src/stores/{domain}.store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { domainApi } from '@/api/{domain}.api'
import { useToast } from '@/core/composables/useToast'
import type { Entity } from '@/types/{domain}.types'

export const use{Domain}Store = defineStore('{domain}', () => {
  // composables
  const toast = useToast()

  // state
  const items = ref<Entity[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // getters
  const itemCount = computed(() => items.value.length)

  // actions
  const fetchItems = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await domainApi.getAll()
      items.value = response.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : '오류 발생'
      toast.error(error.value)
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    items.value = []
    error.value = null
  }

  return {
    // state
    items,
    isLoading,
    error,
    // getters
    itemCount,
    // actions
    fetchItems,
    reset,
  }
})
```
