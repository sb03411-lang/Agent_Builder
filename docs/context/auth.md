# 인증 도메인 컨텍스트

> auth 도메인 관련 작업 시 이 문서를 참고하세요.
> Claude Code에게 "docs/context/auth.md 읽고 작업해줘"라고 요청하세요.

---

## 📁 관련 파일

```
src/
├── api/
│   └── auth.api.ts           # 인증 API
├── stores/
│   └── auth.store.ts         # 인증 상태 관리
├── views/
│   └── auth/
│       ├── LoginView.vue     # 로그인 페이지
│       └── RegisterView.vue  # 회원가입 페이지
├── components/
│   └── auth/
│       ├── LoginForm.vue     # 로그인 폼
│       └── RegisterForm.vue  # 회원가입 폼
├── router/
│   ├── routes/
│   │   └── auth.routes.ts    # 인증 라우트
│   └── guards/
│       └── auth.guard.ts     # 인증 가드
└── types/
    └── auth.types.ts         # 인증 타입
```

---

## 🔐 인증 플로우

### 로그인
```
1. 사용자가 이메일/비밀번호 입력
2. LoginForm에서 유효성 검사 (VeeValidate + zod)
3. auth.store.login() 호출
4. authApi.login() API 요청
5. 성공 시:
   - token을 localStorage에 저장
   - user 정보를 store에 저장
   - /dashboard로 리다이렉트
6. 실패 시:
   - 에러 메시지 토스트 표시
```

### 로그아웃
```
1. auth.store.logout() 호출
2. localStorage에서 token 제거
3. store 상태 초기화
4. /login으로 리다이렉트
```

### 토큰 관리
```
- 저장 위치: localStorage ('token' 키)
- 만료 시간: 24시간 (서버 설정)
- 리프레시 토큰: 미사용
- 토큰 주입: interceptors.ts에서 Authorization 헤더에 자동 추가
```

### 인증 상태 복원
```
1. 앱 시작 시 main.ts에서 auth.store.initialize() 호출
2. localStorage에서 token 확인
3. token 있으면 store에 설정
4. (선택) auth.store.fetchMe()로 사용자 정보 조회
```

---

## 🌐 API 스펙

### POST /auth/login
```typescript
// Request
{
  email: string
  password: string
}

// Response 200
{
  token: string
  user: {
    id: number
    email: string
    name: string
    role: 'admin' | 'user' | 'guest'
  }
}

// Response 401
{
  message: "이메일 또는 비밀번호가 올바르지 않습니다"
}
```

### POST /auth/register
```typescript
// Request
{
  email: string
  password: string
  name: string
}

// Response 201
{
  token: string
  user: {
    id: number
    email: string
    name: string
    role: 'user'
  }
}

// Response 400
{
  message: "이미 등록된 이메일입니다"
}
```

### GET /auth/me
```typescript
// Headers
Authorization: Bearer {token}

// Response 200
{
  id: number
  email: string
  name: string
  role: 'admin' | 'user' | 'guest'
}

// Response 401
{
  message: "인증이 필요합니다"
}
```

---

## 📝 타입 정의

```typescript
// src/types/auth.types.ts

export type UserRole = 'admin' | 'user' | 'guest'

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface RegisterResponse {
  token: string
  user: User
}
```

---

## ✅ 유효성 검사 규칙

### 로그인 폼
```typescript
const loginSchema = z.object({
  email: z.string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z.string()
    .min(1, '비밀번호를 입력해주세요'),
})
```

### 회원가입 폼
```typescript
const registerSchema = z.object({
  email: z.string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다'),
  passwordConfirm: z.string()
    .min(1, '비밀번호 확인을 입력해주세요'),
  name: z.string()
    .min(2, '이름은 2자 이상이어야 합니다')
    .max(50, '이름은 50자 이하여야 합니다'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
})
```

---

## 🛡 라우트 가드

### auth.guard.ts
```typescript
// 인증 필요 페이지 접근 시
- 토큰 없으면 → /login으로 리다이렉트 (redirect 쿼리 포함)
- 토큰 있으면 → 통과

// 이미 로그인된 상태에서 /login, /register 접근 시
- /dashboard로 리다이렉트
```

---

## ⚠️ 주의사항

1. **토큰 보안**
   - 토큰은 localStorage에만 저장 (cookie 미사용)
   - XSS 방어를 위해 v-html 사용 금지
   - API 응답에서 토큰 외 민감정보 노출 주의

2. **에러 처리**
   - 401 응답 시 자동 로그아웃 (interceptor에서 처리)
   - 로그인 실패 시 구체적인 에러 메시지 표시하지 않음 (보안)

3. **UX**
   - 로그인 후 원래 가려던 페이지로 리다이렉트 (redirect 쿼리 활용)
   - 로딩 중 버튼 비활성화 + 스피너 표시

---

## 📋 작업 요청 예시

### 비밀번호 찾기 기능 추가 시
```
auth 도메인에 비밀번호 찾기 기능을 추가해줘.

docs/context/auth.md 읽고 기존 패턴에 맞게:
1. authApi에 forgotPassword, resetPassword 추가
2. ForgotPasswordForm.vue 컴포넌트 생성
3. ResetPasswordView.vue 페이지 생성
4. auth.routes.ts에 라우트 추가

기존 폼 스타일/유효성 검사 패턴 따라줘.
```
