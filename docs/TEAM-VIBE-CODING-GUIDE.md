# 팀 Vibe Coding 가이드

> Claude Code를 활용한 팀 단위 개발 가이드입니다.

---

## 🎯 핵심 원칙

### 1. 일관성 유지
- 모든 팀원이 **CLAUDE.md** 파일을 통해 같은 컨텍스트 공유
- **프롬프트 템플릿** 라이브러리 활용
- 생성된 코드는 반드시 **리뷰** 후 머지

### 2. 작은 단위로 작업
- 한 번에 하나의 기능/컴포넌트만 요청
- 큰 기능은 단계별로 분리
- 자주 커밋, 작은 PR

### 3. 컨텍스트 관리
- 도메인별 컨텍스트 문서 작성
- 변경사항 발생 시 문서 업데이트
- 팀원 간 공유

---

## 📁 문서 구조

```
project-root/
├── CLAUDE.md                    # 프로젝트 전체 컨텍스트 (필수)
└── docs/
    ├── ARCHITECTURE.md          # 상세 아키텍처 스펙
    ├── STEP-BY-STEP-PROMPTS.md  # 단계별 요청 가이드
    ├── prompts/                 # 프롬프트 템플릿
    │   ├── component.md
    │   ├── api.md
    │   ├── store.md
    │   ├── feature.md
    │   └── refactor.md
    └── context/                 # 도메인별 컨텍스트
        ├── auth.md
        ├── user.md
        └── dashboard.md
```

---

## 🔄 Git 워크플로우

### 브랜치 전략

```
main (production)
  └── develop
        ├── feature/user-list      ← 팀원 A
        ├── feature/user-detail    ← 팀원 B
        └── feature/order-form     ← 팀원 C
```

### 브랜치 네이밍
```
feature/{기능명}    # 새 기능
fix/{이슈번호}      # 버그 수정
refactor/{대상}     # 리팩토링
docs/{문서명}       # 문서 작업
```

### 커밋 메시지
```bash
# 일반 커밋
feat: 사용자 목록 페이지 추가
fix: 로그인 폼 유효성 검사 수정
refactor: UserTable 컴포넌트 분리
docs: API 문서 업데이트

# AI 생성 코드임을 명시 (선택)
feat: 사용자 목록 페이지 추가 [ai-assisted]
```

### PR 규칙
1. **작은 단위**: 300줄 이하 권장
2. **셀프 리뷰**: 머지 전 본인 코드 다시 확인
3. **빠른 리뷰**: 24시간 내 리뷰 완료 목표
4. **충돌 최소화**: develop 자주 rebase

---

## 👥 협업 프로세스

### 작업 시작 전

```markdown
## 작업 전 체크리스트
- [ ] develop 브랜치 최신화
- [ ] 작업할 기능과 겹치는 작업자 확인
- [ ] 공통 파일 수정 필요 시 팀과 조율
- [ ] CLAUDE.md 최신 버전 확인
```

### 데일리 Vibe Sync (15분)

```markdown
## 아젠다
1. 어제 AI와 작업한 내용 (2분씩)
   - 어떤 기능?
   - 잘 된 점 / 어려웠던 점

2. 오늘 AI와 작업할 내용 (1분씩)
   - 어떤 기능?
   - 예상 이슈?

3. 공유할 프롬프트/팁 (5분)

4. 충돌 가능성 체크 (3분)
```

### 위클리 프롬프트 리뷰 (30분)

```markdown
## 아젠다
1. 이번 주 유용했던 프롬프트 공유
2. AI가 자주 틀린 패턴 논의
3. CLAUDE.md 업데이트 필요 사항
4. 프롬프트 템플릿 추가/수정
5. 컨벤션 변경 논의
```

---

## ✅ 코드 리뷰 체크리스트

### AI 생성 코드 리뷰 시 특별히 확인할 점

```markdown
## 기본 검증
- [ ] TypeScript 에러 없음
- [ ] ESLint 경고 없음
- [ ] 빌드 성공

## 코드 품질
- [ ] 네이밍 컨벤션 준수 (CLAUDE.md 기준)
- [ ] 불필요한 코드/주석 제거
- [ ] any 타입 사용 없음
- [ ] 하드코딩된 값 없음 (상수화)
- [ ] 과도한 복잡성 없음

## AI 특이사항
- [ ] 환각(hallucination) 코드 없음
- [ ] 존재하지 않는 API/라이브러리 사용 없음
- [ ] 프로젝트에 없는 의존성 import 없음
- [ ] 기존 패턴과 일관성 유지

## 보안
- [ ] XSS 취약점 없음 (v-html 주의)
- [ ] 민감 정보 노출 없음
- [ ] 적절한 인증/권한 체크

## 비즈니스 로직
- [ ] 요구사항 충족
- [ ] 엣지 케이스 처리
- [ ] 에러 핸들링 적절
```

---

## 🚫 피해야 할 패턴

### 프롬프트 작성 시

```markdown
❌ 나쁜 예시
"로그인 기능 만들어줘"
→ 너무 모호함, 어떤 구조로 만들지 불명확

✅ 좋은 예시
"로그인 기능을 생성해줘.
- LoginView.vue (AuthLayout 사용)
- LoginForm.vue (VeeValidate + zod)
- auth.store.ts의 login 액션 호출
- 성공 시 /dashboard로 이동
- CLAUDE.md 컨벤션 따라줘"
```

### 코드 생성 시

```markdown
❌ 피해야 할 것
- 한 번에 너무 많은 파일 생성 요청
- 컨텍스트 없이 요청
- 생성된 코드 검토 없이 바로 커밋
- 기존 코드와 스타일 불일치

✅ 권장하는 것
- 단계별로 나눠서 요청
- 항상 CLAUDE.md 참조 요청
- 생성 후 반드시 검토
- 기존 패턴과 일관성 확인
```

---

## 🔧 문제 해결

### AI가 잘못된 코드를 생성했을 때

```markdown
1. 구체적인 수정 요청
   "{파일명}의 {라인/함수}가 잘못됐어.
현재: {현재_코드}
   원하는: {원하는_동작}
   수정해줘."

2. 예시 코드 제공
   "기존에 이렇게 작성된 코드가 있어:
   {예시_코드}
   이 패턴으로 수정해줘."

3. CLAUDE.md 참조 요청
   "CLAUDE.md의 {섹션} 컨벤션을 다시 확인하고 수정해줘."
```

### 컨텍스트가 누락됐을 때

```markdown
"이 프로젝트의 컨텍스트를 알려줄게:
{CLAUDE.md 내용 또는 요약}

이 컨텍스트 기반으로 다시 {작업_내용} 해줘."
```

### 기존 코드와 충돌할 때

```markdown
"기존에 이런 코드가 있어:
{기존_코드}

이것과 호환되도록 {새_기능}을 구현해줘.
기존 인터페이스 변경 최소화해줘."
```

---

## 📊 품질 게이트

### CI/CD 자동 검증

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install
        run: npm ci
      
      - name: Type Check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
```

### 머지 조건
- [ ] CI 통과 (type-check, lint, build)
- [ ] 최소 1명 리뷰 승인
- [ ] 모든 리뷰 코멘트 해결
- [ ] develop과 충돌 없음

---

## 📚 참고 자료

### 프롬프트 템플릿 위치
- `docs/prompts/component.md` - 컴포넌트 생성
- `docs/prompts/api.md` - API 레이어 생성
- `docs/prompts/store.md` - 스토어 생성
- `docs/prompts/feature.md` - 기능 단위 생성
- `docs/prompts/refactor.md` - 리팩토링

### 도메인 컨텍스트 위치
- `docs/context/{domain}.md`

### 아키텍처 문서
- `docs/ARCHITECTURE.md`
