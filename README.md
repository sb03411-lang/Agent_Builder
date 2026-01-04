# Vue 3 프로젝트 아키텍처 문서

> Claude Code를 활용한 Vue 3 프로젝트 개발을 위한 종합 문서입니다.

---

## 📁 문서 구조

```
vue3-architecture-docs/
├── CLAUDE.md                          # 🔴 Claude Code 컨텍스트 (프로젝트 루트에 배치)
├── README.md                          # 이 파일
└── docs/
    ├── ARCHITECTURE.md                # 상세 아키텍처 스펙
    ├── STEP-BY-STEP-PROMPTS.md        # 단계별 프로젝트 생성 가이드
    ├── TEAM-VIBE-CODING-GUIDE.md      # 팀 협업 가이드
    ├── prompts/                       # 프롬프트 템플릿
    │   ├── component.md               # 컴포넌트 생성
    │   ├── api.md                     # API 레이어 생성
    │   ├── store.md                   # Pinia 스토어 생성
    │   ├── feature.md                 # 기능 단위 생성
    │   └── refactor.md                # 리팩토링
    └── context/                       # 도메인별 컨텍스트
        └── auth.md                    # 인증 도메인 예시
```

---

## 🚀 사용 방법

### 1. 새 프로젝트 시작

1. `CLAUDE.md`를 프로젝트 루트에 복사
2. `docs/ARCHITECTURE.md`를 Claude Code에 전달
3. `docs/STEP-BY-STEP-PROMPTS.md`의 프롬프트를 순서대로 실행

### 2. 기존 프로젝트에 적용

1. `CLAUDE.md`를 프로젝트에 맞게 수정
2. `docs/prompts/` 템플릿을 활용하여 기능 추가

### 3. 팀 협업

1. `docs/TEAM-VIBE-CODING-GUIDE.md` 숙지
2. `docs/context/` 폴더에 도메인별 컨텍스트 문서 작성
3. 데일리/위클리 Vibe Sync 미팅 진행

---

## 📋 문서별 용도

| 문서 | 용도 | 대상 |
|------|------|------|
| `CLAUDE.md` | Claude Code가 참조하는 프로젝트 컨텍스트 | Claude Code |
| `ARCHITECTURE.md` | 상세 기술 스펙, 설정 파일 내용 | 개발자 |
| `STEP-BY-STEP-PROMPTS.md` | 프로젝트 초기 생성 가이드 | Claude Code |
| `TEAM-VIBE-CODING-GUIDE.md` | 팀 협업 프로세스 | 팀원 |
| `prompts/*.md` | 상황별 프롬프트 템플릿 | Claude Code |
| `context/*.md` | 도메인별 상세 컨텍스트 | Claude Code |

---

## ⚙️ 기술 스택 요약

- **Framework**: Vue 3.4 + TypeScript
- **Build**: Vite 5
- **State**: Pinia
- **HTTP**: axios
- **Styling**: Tailwind CSS + Headless UI
- **Form**: VeeValidate + zod
- **Utils**: VueUse, dayjs
- **Code Quality**: ESLint, Prettier, Husky, commitlint

---

## 📝 주요 결정 사항

- ✅ 폴더 구조: 하이브리드 (타입 + 도메인) + Core
- ✅ 공용 컴포넌트 접두사: `Common`
- ✅ API 레이어: 계층화 구조
- ✅ 환경 변수: development, production
- ✅ 라우터: 도메인별 분리
- ✅ 에러 처리: 통합 구조
- ✅ 로딩 패턴: 통합 패턴

---

## 🔗 참고 링크

- [Vue 3 공식 문서](https://vuejs.org/)
- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI Vue](https://headlessui.com/vue)
- [VeeValidate](https://vee-validate.logaretm.com/v4/)
- [VueUse](https://vueuse.org/)
