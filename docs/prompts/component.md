# 컴포넌트 생성 프롬프트 템플릿

> 새로운 컴포넌트를 생성할 때 사용하는 템플릿입니다.

---

## 📋 템플릿

```
{컴포넌트_종류} 컴포넌트를 생성해줘.

### 기본 정보
- 이름: {컴포넌트명}
- 위치: {파일_경로}
- 용도: {컴포넌트_설명}

### Props
{props_목록}

### Emits
{emits_목록}

### Slots (있다면)
{slots_목록}

### 기능 요구사항
{기능_설명}

### 의존성 (사용할 컴포넌트/라이브러리)
{의존성_목록}

### 참고
- CLAUDE.md 컨벤션 따라줘
- TypeScript + script setup 사용
- Tailwind CSS 사용
```

---

## 📝 예시 1: 공용 컴포넌트

```
공용 컴포넌트를 생성해줘.

### 기본 정보
- 이름: CommonPagination
- 위치: src/core/components/CommonPagination.vue
- 용도: 테이블/리스트 하단 페이지네이션 UI

### Props
- currentPage: number (현재 페이지, required)
- totalPages: number (전체 페이지 수, required)
- perPage: number (페이지당 항목 수, 기본값 10)
- showPerPageSelector: boolean (페이지당 항목 수 선택기 표시, 기본값 true)

### Emits
- update:currentPage (페이지 변경 시)
- update:perPage (페이지당 항목 수 변경 시)

### 기능 요구사항
- 이전/다음 버튼
- 페이지 번호 버튼 (최대 5개 표시, 현재 페이지 중심)
- 처음/마지막 페이지 이동 버튼
- 페이지당 항목 수 선택 (10, 20, 50 옵션)
- 첫 페이지면 이전 버튼 비활성화
- 마지막 페이지면 다음 버튼 비활성화

### 의존성
- @heroicons/vue (ChevronLeftIcon, ChevronRightIcon 등)
- CommonButton

### 참고
- CLAUDE.md 컨벤션 따라줘
- 반응형 고려 (모바일에서는 버튼 축소)
```

---

## 📝 예시 2: 도메인 컴포넌트

```
도메인 컴포넌트를 생성해줘.

### 기본 정보
- 이름: UserCard
- 위치: src/components/user/UserCard.vue
- 용도: 사용자 정보를 카드 형태로 표시

### Props
- user: User (사용자 객체, required)
- showActions: boolean (액션 버튼 표시 여부, 기본값 true)

### Emits
- edit (수정 버튼 클릭)
- delete (삭제 버튼 클릭)

### Slots
- actions (커스텀 액션 버튼 영역)

### 기능 요구사항
- 프로필 이미지 (없으면 이니셜 표시)
- 이름, 이메일 표시
- 역할 배지
- 수정/삭제 버튼 (showActions가 true일 때)

### 의존성
- CommonButton
- @heroicons/vue (PencilIcon, TrashIcon)

### 참고
- User 타입은 src/types/user.types.ts에서 import
- 이미지 에러 시 이니셜 폴백
```

---

## 📝 예시 3: 폼 컴포넌트

```
폼 컴포넌트를 생성해줘.

### 기본 정보
- 이름: UserForm
- 위치: src/components/user/UserForm.vue
- 용도: 사용자 생성/수정 폼

### Props
- initialData: Partial<User> | null (수정 시 기존 데이터)
- isLoading: boolean (제출 중 로딩 상태)

### Emits
- submit (폼 제출, payload: CreateUserDto | UpdateUserDto)
- cancel (취소 버튼 클릭)

### 기능 요구사항
- 이름, 이메일, 역할 입력 필드
- VeeValidate + zod 유효성 검사
  - 이름: 필수, 2자 이상
  - 이메일: 필수, 이메일 형식
  - 역할: 필수, admin/user/guest 중 선택
- initialData 있으면 수정 모드 (필드 초기값 설정)
- 제출/취소 버튼

### 의존성
- CommonInput
- CommonButton
- vee-validate, @vee-validate/zod, zod
- Headless UI Listbox (역할 선택)

### 참고
- CLAUDE.md 폼 패턴 참고
- 에러 메시지는 필드 하단에 표시
```

---

## 🏷 컴포넌트 종류별 파일 위치

| 종류 | 위치 | 접두사/접미사 |
|------|------|--------------|
| 공용 | `src/core/components/` | `Common` 접두사 |
| 레이아웃 | `src/core/layouts/` | `Layout` 접미사 |
| 도메인 | `src/components/{domain}/` | 도메인명 |
| 페이지 | `src/views/{domain}/` | `View` 접미사 |
