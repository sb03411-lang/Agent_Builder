# Claude Code 단계별 요청 프롬프트

> 아래 프롬프트를 순서대로 복사해서 사용하세요.
> 각 단계가 완료되면 다음 단계를 요청하세요.

---

## 🚀 시작하기 전에

### 0단계: 컨텍스트 전달

CLAUDE.md 파일과 ARCHITECTURE.md 파일을 먼저 전달합니다:

```
이 두 문서를 기반으로 Vue 3 프로젝트를 생성할 거야.
CLAUDE.md는 프로젝트 컨텍스트, ARCHITECTURE.md는 상세 스펙이야.
단계별로 요청할 테니 확인했으면 알려줘.
```

---

## 📦 프로젝트 초기화

### 1단계: 프로젝트 생성 & package.json

```
1단계: 프로젝트 초기화해줘.

1. Vite + Vue 3 + TypeScript 프로젝트 생성
2. ARCHITECTURE.md의 dependencies, devDependencies를 package.json에 추가
3. scripts도 ARCHITECTURE.md 참고해서 추가

아직 npm install은 하지 말고 package.json만 완성해줘.
```

### 2단계: 설정 파일

```
2단계: 설정 파일들 생성해줘.

ARCHITECTURE.md의 "설정 파일 내용" 섹션 참고해서:
- vite.config.ts
- tsconfig.json
- tsconfig.node.json
- tailwind.config.js
- postcss.config.js
- .eslintrc.cjs
- .prettierrc
- commitlint.config.js
- lint-staged.config.js
- .gitignore
```

### 3단계: Husky 설정

```
3단계: Husky + Git 훅 설정해줘.

- .husky/pre-commit
- .husky/commit-msg
- package.json의 prepare 스크립트 확인
```

### 4단계: 환경변수

```
4단계: 환경변수 파일 생성해줘.

- .env.development
- .env.production
- src/env.d.ts

ARCHITECTURE.md 참고해줘.
```

---

## 🏗 폴더 구조 생성

### 5단계: src 폴더 구조

```
5단계: src/ 폴더 구조 생성해줘.

ARCHITECTURE.md의 폴더 구조 참고해서 빈 폴더들 생성:
- core/ (api, components, composables, layouts, errors, constants, types, utils)
- api/
- stores/
- components/ (auth, dashboard)
- views/ (auth, dashboard)
- router/ (routes, guards)
- assets/ (images/common, images/domain/auth, images/domain/dashboard, fonts, styles)
```

---

## ⚙️ Core 모듈 구현

### 6단계: core/api

```
6단계: core/api/ 파일들 구현해줘.

ARCHITECTURE.md의 "핵심 파일 구현 예시" 참고:
- client.ts
- interceptors.ts
- error-handler.ts
- types.ts

CLAUDE.md의 네이밍 컨벤션 따라줘.
```

### 7단계: core/errors

```
7단계: core/errors/ 파일들 구현해줘.

ARCHITECTURE.md 참고:
- index.ts (ApiError, NetworkError, ValidationError 클래스)
- error-messages.ts (ERROR_MESSAGES 상수)
- error-boundary.vue (onErrorCaptured로 에러 캐치, 폴백 UI)
```

### 8단계: core/composables

```
8단계: core/composables/ 파일들 구현해줘.

- useLoading.ts
  - isLoading, startLoading, stopLoading, setError
  - withLoading<T>(fn): 비동기 래퍼
  
- useToast.ts
  - vue-sonner 래핑
  - success, error, info, warning 메서드
```

### 9단계: core/components

```
9단계: core/components/ 공용 컴포넌트 구현해줘.

모두 TypeScript + script setup + Tailwind 사용:

1. CommonButton.vue
   - Props: variant (primary/secondary/danger), size (sm/md/lg), loading, disabled
   - Emits: click

2. CommonInput.vue
   - Props: modelValue, type, placeholder, error, disabled
   - Emits: update:modelValue

3. CommonModal.vue
   - Headless UI Dialog 사용
   - Props: isOpen, title
   - Emits: close
   - Slots: default, footer

4. CommonSpinner.vue
   - Props: size (sm/md/lg)

5. CommonSkeleton.vue
   - Props: type (card/list/text), count

6. CommonLoadingOverlay.vue
   - Props: show
   - 전체 화면 오버레이 + CommonSpinner
```

### 10단계: core/layouts

```
10단계: core/layouts/ 레이아웃 컴포넌트 구현해줘.

Tailwind 사용, 반응형 고려:

1. DefaultLayout.vue
   - Header (로고, 네비게이션)
   - slot (메인 콘텐츠)
   - Footer

2. AuthLayout.vue
   - 중앙 정렬
   - 로고
   - slot (폼 영역)

3. DashboardLayout.vue
   - Header (로고, 유저 메뉴)
   - Sidebar (네비게이션, 토글 가능)
   - main slot
```

---

## 📦 상태 관리 & 라우팅

### 11단계: stores

```
11단계: stores/ Pinia 스토어 구현해줘.

Composition API 스타일 (setup store):

1. auth.store.ts
   - ARCHITECTURE.md 예시 참고
   - user, token, isAuthenticated
   - login, logout, initialize, fetchMe

2. ui.store.ts
   - ARCHITECTURE.md 예시 참고
   - isGlobalLoading, sidebarOpen, theme
   - setGlobalLoading, toggleSidebar, setTheme, initializeTheme
```

### 12단계: router

```
12단계: router/ 파일들 구현해줘.

1. guards/auth.guard.ts
   - 인증 체크
   - 미인증 시 /login 리다이렉트
   - 이미 인증된 상태에서 /login 접근 시 /dashboard 리다이렉트

2. routes/auth.routes.ts
   - /login (AuthLayout)
   - /register (AuthLayout)

3. routes/dashboard.routes.ts
   - /dashboard (DashboardLayout, 인증 필요)

4. routes/index.ts
   - 모든 라우트 병합 export

5. index.ts
   - createRouter
   - 가드 등록 (beforeEach)
   - 레이아웃 메타 처리
```

---

## 🌐 API & 페이지

### 13단계: api 도메인 API

```
13단계: api/ 도메인별 API 파일 구현해줘.

core/api/client 사용, 타입 정의 포함:

1. auth.api.ts
   - login(email, password)
   - logout()
   - register(email, password, name)
   - getMe()

2. user.api.ts
   - getUsers(params?)
   - getUserById(id)
   - updateUser(id, data)
   - deleteUser(id)
```

### 14단계: 예시 컴포넌트 & 페이지

```
14단계: 예시 컴포넌트와 페이지 구현해줘.

1. components/auth/LoginForm.vue
   - CommonInput, CommonButton 사용
   - VeeValidate + zod 폼 검증
   - email, password 필드
   - Emits: submit

2. components/dashboard/StatCard.vue
   - Props: title, value, icon, trend
   - Heroicons 사용

3. views/auth/LoginView.vue
   - AuthLayout 사용
   - LoginForm 포함
   - auth.store.login 호출

4. views/auth/RegisterView.vue
   - AuthLayout 사용
   - 회원가입 폼

5. views/dashboard/DashboardView.vue
   - DashboardLayout 사용
   - 환영 메시지
   - StatCard 예시 3-4개
```

---

## 🎨 마무리

### 15단계: App.vue & main.ts

```
15단계: App.vue와 main.ts 완성해줘.

main.ts:
- createApp
- Pinia 등록
- Router 등록
- assets/styles/index.css import
- App mount
- auth.store.initialize() 호출

App.vue:
- 라우트 메타 기반 동적 레이아웃
- CommonLoadingOverlay (ui.store.isGlobalLoading)
- Toaster (vue-sonner)
```

### 16단계: assets 기본 파일

```
16단계: assets/ 기본 파일들 생성해줘.

styles/:
- index.css (Tailwind directives, fonts.css import)
- variables.css (CSS 변수 - 색상 등)
- fonts.css (@font-face Pretendard placeholder)

images/common/:
- logo.svg (간단한 placeholder SVG)
```

### 17단계: 최종 점검

```
17단계: 최종 점검해줘.

1. 모든 import가 @/ alias 사용하는지
2. TypeScript 에러 없는지 (vue-tsc --noEmit)
3. ESLint 에러 없는지
4. 빠진 파일 없는지
5. package.json scripts 확인

문제 있으면 수정해줘.
```

---

## 💡 추가 요청 템플릿

### 새 기능 추가 시

```
[기능명] 기능을 추가해줘.

### 요구사항
- (기능 설명)

### 필요한 파일
- api: (API 엔드포인트)
- store: (상태)
- components: (필요한 컴포넌트)
- views: (페이지)
- routes: (라우트 추가)

CLAUDE.md 컨벤션 따라줘.
```

### 버그 수정 시

```
[파일 경로]에 문제가 있어.

### 현상
- (현재 동작)

### 기대 동작
- (원하는 동작)

### 재현 방법
1. (단계)

수정해줘.
```

### 리팩토링 시

```
[파일/폴더]를 리팩토링해줘.

### 현재 문제
- (문제점)

### 개선 방향
- (원하는 방향)

CLAUDE.md 컨벤션 유지해줘.
```
