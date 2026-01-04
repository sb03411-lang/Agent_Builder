# Vue 3 프로젝트 아키텍처 스펙

> Claude Code에 전달하여 프로젝트를 생성할 때 사용하는 상세 스펙 문서입니다.

---

## 1. 기술 스택

### dependencies

```json
{
  "vue": "^3.4.0",
  "vue-router": "^4.2.0",
  "pinia": "^2.1.0",
  "axios": "^1.6.0",
  "tailwindcss": "^3.4.0",
  "@headlessui/vue": "^1.7.0",
  "@heroicons/vue": "^2.1.0",
  "@vueuse/core": "^10.7.0",
  "dayjs": "^1.11.0",
  "vee-validate": "^4.12.0",
  "zod": "^3.22.0",
  "@vee-validate/zod": "^4.12.0",
  "vue-sonner": "^1.0.0",
  "@vue-flow/core": "^1.46.0",
  "@vue-flow/background": "^1.3.2",
  "@vue-flow/controls": "^1.1.3",
  "@vue-flow/minimap": "^1.5.4",
  "jspdf": "^3.0.3",
  "pdfjs-dist": "^5.4.296",
  "html2canvas": "^1.4.1",
  "xlsx": "^0.18.5"
}
```

### devDependencies

```json
{
  "@vitejs/plugin-vue": "^5.0.0",
  "typescript": "^5.3.0",
  "vue-tsc": "^1.8.0",
  "eslint": "^8.57.0",
  "eslint-plugin-vue": "^9.19.0",
  "@typescript-eslint/parser": "^6.19.0",
  "@typescript-eslint/eslint-plugin": "^6.19.0",
  "prettier": "^3.2.0",
  "@vue/eslint-config-prettier": "^9.0.0",
  "husky": "^9.0.0",
  "lint-staged": "^15.2.0",
  "@commitlint/cli": "^18.6.0",
  "@commitlint/config-conventional": "^18.6.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0"
}
```

---

## 2. 폴더 구조 상세

```
project-root/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── core/                          # 공통/핵심 모듈
│   │   ├── api/
│   │   │   ├── client.ts              # axios 인스턴스 생성
│   │   │   ├── interceptors.ts        # 요청/응답 인터셉터
│   │   │   ├── error-handler.ts       # 에러 핸들링
│   │   │   └── types.ts               # ApiResponse<T>, PaginatedResponse<T>
│   │   │
│   │   ├── components/
│   │   │   ├── CommonButton.vue       # variant, size, loading, disabled
│   │   │   ├── CommonInput.vue        # v-model, type, placeholder, error
│   │   │   ├── CommonModal.vue        # Headless UI Dialog
│   │   │   ├── CommonSpinner.vue      # size prop
│   │   │   ├── CommonSkeleton.vue     # type (card, list, text)
│   │   │   └── CommonLoadingOverlay.vue # 전체 화면 로딩
│   │   │
│   │   ├── composables/
│   │   │   ├── useLoading.ts          # isLoading, withLoading
│   │   │   └── useToast.ts            # vue-sonner 래퍼
│   │   │
│   │   ├── layouts/
│   │   │   ├── DefaultLayout.vue      # Header + slot + Footer
│   │   │   ├── AuthLayout.vue         # 중앙 정렬, 심플
│   │   │   └── DashboardLayout.vue    # Header + Sidebar + slot
│   │   │
│   │   ├── errors/
│   │   │   ├── index.ts               # ApiError, NetworkError 클래스
│   │   │   ├── error-boundary.vue     # onErrorCaptured
│   │   │   └── error-messages.ts      # ERROR_MESSAGES 상수
│   │   │
│   │   ├── constants/
│   │   │   └── index.ts               # 앱 전역 상수
│   │   │
│   │   ├── types/
│   │   │   └── common.ts              # 공용 타입/인터페이스
│   │   │
│   │   └── utils/
│   │       ├── format.ts              # formatDate, formatPrice 등
│   │       └── validators.ts          # 유효성 검사 유틸
│   │
│   ├── api/                           # 도메인별 API
│   │   ├── auth.api.ts                # login, logout, register, getMe
│   │   └── user.api.ts                # getUsers, getUserById, updateUser
│   │
│   ├── stores/                        # Pinia 스토어
│   │   ├── auth.store.ts              # user, token, isAuthenticated
│   │   └── ui.store.ts                # isGlobalLoading, sidebarOpen, theme
│   │
│   ├── components/                    # 도메인별 컴포넌트
│   │   ├── auth/
│   │   │   └── LoginForm.vue
│   │   └── dashboard/
│   │       └── StatCard.vue
│   │
│   ├── views/                         # 페이지
│   │   ├── auth/
│   │   │   ├── LoginView.vue
│   │   │   └── RegisterView.vue
│   │   └── dashboard/
│   │       └── DashboardView.vue
│   │
│   ├── router/
│   │   ├── index.ts                   # createRouter, 가드 등록
│   │   ├── routes/
│   │   │   ├── index.ts               # 라우트 병합
│   │   │   ├── auth.routes.ts         # /login, /register
│   │   │   └── dashboard.routes.ts    # /dashboard
│   │   └── guards/
│   │       └── auth.guard.ts          # 인증 체크 가드
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── common/
│   │   │   │   └── logo.svg
│   │   │   └── domain/
│   │   │       ├── auth/
│   │   │       └── dashboard/
│   │   ├── fonts/
│   │   │   └── pretendard/
│   │   └── styles/
│   │       ├── index.css              # Tailwind directives
│   │       ├── variables.css          # CSS 변수
│   │       └── fonts.css              # @font-face
│   │
│   ├── App.vue
│   ├── main.ts
│   └── env.d.ts                       # ImportMetaEnv 타입
│
├── docs/
│   ├── prompts/                       # 프롬프트 템플릿
│   │   ├── component.md
│   │   ├── api.md
│   │   ├── store.md
│   │   ├── feature.md
│   │   └── refactor.md
│   └── context/                       # 도메인별 컨텍스트
│       ├── auth.md
│       └── dashboard.md
│
├── .husky/
│   ├── pre-commit
│   └── commit-msg
│
├── CLAUDE.md                          # Claude Code 컨텍스트
├── .env.development
├── .env.production
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── commitlint.config.js
├── lint-staged.config.js
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## 3. 설정 파일 내용

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
})
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
  },
}
```

### .prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "vueIndentScriptAndStyle": true
}
```

### commitlint.config.js

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 새 기능
        'fix',      // 버그 수정
        'docs',     // 문서
        'style',    // 포맷팅
        'refactor', // 리팩토링
        'test',     // 테스트
        'chore',    // 기타
      ],
    ],
  },
}
```

### lint-staged.config.js

```javascript
export default {
  '*.{js,ts,vue}': ['eslint --fix'],
  '*.{js,ts,vue,css,md,json}': ['prettier --write'],
}
```

### .env.development

```bash
VITE_APP_ENV=development
VITE_API_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000
VITE_ENABLE_DEBUG=true
```

### .env.production

```bash
VITE_APP_ENV=production
VITE_API_URL=https://api.example.com
VITE_API_TIMEOUT=10000
VITE_ENABLE_DEBUG=false
```

### src/env.d.ts

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'development' | 'production'
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint . --ext .vue,.js,.ts --fix",
    "format": "prettier --write \"src/**/*.{js,ts,vue,css,json}\"",
    "prepare": "husky install"
  }
}
```

### .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### .husky/commit-msg

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

### .gitignore

```
# Dependencies
node_modules/
.pnpm-store/

# Build
dist/
dist-ssr/
*.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
```

---

## 4. 핵심 파일 구현 예시

### core/api/client.ts

```typescript
import axios from 'axios'
import { setupInterceptors } from './interceptors'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

setupInterceptors(client)

export default client
```

### core/api/interceptors.ts

```typescript
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { handleApiError } from './error-handler'
import { useAuthStore } from '@/stores/auth.store'

export function setupInterceptors(client: AxiosInstance): void {
  // 요청 인터셉터
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authStore = useAuthStore()
      
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
      }
      
      return config
    },
    (error: AxiosError) => Promise.reject(error)
  )

  // 응답 인터셉터
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => handleApiError(error)
  )
}
```

### core/api/error-handler.ts

```typescript
import type { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import { ERROR_MESSAGES } from '@/core/errors/error-messages'
import { ApiError } from '@/core/errors'
import router from '@/router'

export function handleApiError(error: AxiosError): Promise<never> {
  const status = error.response?.status
  
  if (!error.response) {
    return Promise.reject(new ApiError(0, 'NETWORK_ERROR', ERROR_MESSAGES.NETWORK))
  }

  switch (status) {
    case 401: {
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
      return Promise.reject(new ApiError(401, 'UNAUTHORIZED', ERROR_MESSAGES.UNAUTHORIZED))
    }
    case 403:
      return Promise.reject(new ApiError(403, 'FORBIDDEN', ERROR_MESSAGES.FORBIDDEN))
    case 404:
      return Promise.reject(new ApiError(404, 'NOT_FOUND', ERROR_MESSAGES.NOT_FOUND))
    case 500:
    default:
      return Promise.reject(new ApiError(status || 500, 'SERVER_ERROR', ERROR_MESSAGES.SERVER))
  }
}
```

### core/api/types.ts

```typescript
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  status: number
  code: string
  message: string
}
```

### core/errors/index.ts

```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class NetworkError extends Error {
  constructor(message: string = '네트워크 연결을 확인해주세요') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(
    public field: string,
    message: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

### core/errors/error-messages.ts

```typescript
export const ERROR_MESSAGES = {
  NETWORK: '네트워크 연결을 확인해주세요',
  UNAUTHORIZED: '로그인이 필요합니다',
  FORBIDDEN: '접근 권한이 없습니다',
  NOT_FOUND: '요청한 데이터를 찾을 수 없습니다',
  SERVER: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  VALIDATION: '입력 값을 확인해주세요',
  UNKNOWN: '알 수 없는 오류가 발생했습니다',
} as const

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES
```

### stores/auth.store.ts

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth.api'

interface User {
  id: number
  email: string
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  // state
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // getters
  const isAuthenticated = computed(() => !!token.value)

  // actions
  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password)
    user.value = response.data.user
    token.value = response.data.token
    localStorage.setItem('token', response.data.token)
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  const initialize = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  const fetchMe = async () => {
    if (!token.value) return
    const response = await authApi.getMe()
    user.value = response.data
  }

  return {
    // state
    user,
    token,
    // getters
    isAuthenticated,
    // actions
    login,
    logout,
    initialize,
    fetchMe,
  }
})
```

### stores/ui.store.ts

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // state
  const isGlobalLoading = ref(false)
  const sidebarOpen = ref(true)
  const theme = ref<'light' | 'dark'>('light')

  // actions
  const setGlobalLoading = (value: boolean) => {
    isGlobalLoading.value = value
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      theme.value = savedTheme
    }
  }

  return {
    // state
    isGlobalLoading,
    sidebarOpen,
    theme,
    // actions
    setGlobalLoading,
    toggleSidebar,
    setTheme,
    initializeTheme,
  }
})
```

---

## 5. 생성 순서 체크리스트

- [ ] 1단계: 프로젝트 초기화 (Vite + Vue 3 + TypeScript)
- [ ] 2단계: package.json 의존성 추가
- [ ] 3단계: 설정 파일 생성 (vite, ts, eslint, prettier, tailwind, commitlint)
- [ ] 4단계: Husky + lint-staged 설정
- [ ] 5단계: 환경변수 파일 생성
- [ ] 6단계: src/ 폴더 구조 생성
- [ ] 7단계: core/api/ 파일 생성
- [ ] 8단계: core/errors/ 파일 생성
- [ ] 9단계: core/composables/ 파일 생성
- [ ] 10단계: core/components/ 파일 생성
- [ ] 11단계: core/layouts/ 파일 생성
- [ ] 12단계: stores/ 파일 생성
- [ ] 13단계: router/ 파일 생성
- [ ] 14단계: api/ 도메인 API 파일 생성
- [ ] 15단계: 예시 페이지 (LoginView, DashboardView) 생성
- [ ] 16단계: App.vue, main.ts 설정
- [ ] 17단계: assets/ 구조 생성
