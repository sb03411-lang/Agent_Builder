# 기능 단위 생성 프롬프트 템플릿

> 새로운 기능을 한 번에 생성할 때 사용하는 템플릿입니다.
> API, 스토어, 컴포넌트, 페이지, 라우트를 함께 생성합니다.

---

## 📋 템플릿

```
{기능명} 기능을 생성해줘.

### 기능 개요
{기능_설명}

### API
- 엔드포인트 베이스: {base_path}
- 필요한 API:
{api_목록}

### 스토어
- 상태:
{state_목록}
- 액션:
{actions_목록}

### 컴포넌트
{컴포넌트_목록}

### 페이지
{페이지_목록}

### 라우트
{라우트_목록}

### 참고
- CLAUDE.md 컨벤션 따라줘
- 기존 공용 컴포넌트 활용
```

---

## 📝 예시 1: 사용자 관리 기능

```
사용자 관리 기능을 생성해줘.

### 기능 개요
관리자가 사용자 목록을 조회하고, 사용자를 생성/수정/삭제할 수 있는 기능

### API
- 파일: src/api/user.api.ts
- 엔드포인트 베이스: /users
- 필요한 API:
  - getUsers(params?) → PaginatedResponse<User>
  - getUserById(id) → User
  - createUser(data) → User
  - updateUser(id, data) → User
  - deleteUser(id) → void

### 타입 정의
- 파일: src/types/user.types.ts
- User { id, email, name, role, createdAt, updatedAt }
- CreateUserDto { email, name, password, role }
- UpdateUserDto { name?, role? }
- UserRole = 'admin' | 'user' | 'guest'

### 스토어
- 파일: src/stores/user.store.ts
- 상태:
  - users: User[]
  - currentUser: User | null
  - isLoading: boolean
  - pagination: { page, limit, total }
  - searchQuery: string
- 액션:
  - fetchUsers()
  - fetchUserById(id)
  - createUser(data)
  - updateUser(id, data)
  - deleteUser(id)
  - setSearchQuery(query)
  - setPage(page)

### 컴포넌트
1. src/components/user/UserTable.vue
   - Props: users, isLoading
   - Emits: edit, delete, pageChange
   - 기능: 테이블, 페이지네이션, 검색

2. src/components/user/UserForm.vue
   - Props: initialData?, isLoading
   - Emits: submit, cancel
   - 기능: 생성/수정 폼, VeeValidate 검증

3. src/components/user/UserCard.vue
   - Props: user
   - Emits: edit, delete
   - 기능: 카드 형태 표시

4. src/components/user/UserDeleteModal.vue
   - Props: user, isOpen
   - Emits: confirm, cancel
   - 기능: 삭제 확인 모달

### 페이지
1. src/views/user/UserListView.vue
   - 사용자 목록 페이지
   - UserTable 사용
   - 검색, 생성 버튼

2. src/views/user/UserDetailView.vue
   - 사용자 상세 페이지
   - UserCard + 수정/삭제 기능

3. src/views/user/UserCreateView.vue
   - 사용자 생성 페이지
   - UserForm 사용

4. src/views/user/UserEditView.vue
   - 사용자 수정 페이지
   - UserForm 사용 (initialData 전달)

### 라우트
- 파일: src/router/routes/user.routes.ts
- /users → UserListView (meta: { layout: 'dashboard', requiresAuth: true })
- /users/create → UserCreateView
- /users/:id → UserDetailView
- /users/:id/edit → UserEditView

### 참고
- DashboardLayout 사용
- 인증 필요 (auth guard)
- 권한 체크: admin만 생성/수정/삭제 가능
```

---

## 📝 예시 2: 게시판 기능

```
게시판 기능을 생성해줘.

### 기능 개요
게시글 목록 조회, 작성, 수정, 삭제 기능. 댓글 기능 포함.

### API
- 파일: src/api/post.api.ts
- 엔드포인트 베이스: /posts
- 필요한 API:
  - getPosts(params?) → PaginatedResponse<Post>
  - getPostById(id) → PostDetail (댓글 포함)
  - createPost(data) → Post
  - updatePost(id, data) → Post
  - deletePost(id) → void
  - getComments(postId) → Comment[]
  - createComment(postId, data) → Comment
  - deleteComment(postId, commentId) → void

### 타입 정의
- 파일: src/types/post.types.ts
- Post { id, title, content, authorId, authorName, viewCount, createdAt }
- PostDetail extends Post { comments: Comment[] }
- Comment { id, postId, content, authorId, authorName, createdAt }
- CreatePostDto { title, content }
- CreateCommentDto { content }

### 스토어
- 파일: src/stores/post.store.ts
- 상태:
  - posts: Post[]
  - currentPost: PostDetail | null
  - isLoading: boolean
  - pagination: { page, limit, total }
- 액션:
  - fetchPosts()
  - fetchPostById(id)
  - createPost(data)
  - updatePost(id, data)
  - deletePost(id)
  - addComment(postId, data)
  - deleteComment(postId, commentId)

### 컴포넌트
1. src/components/post/PostList.vue
   - 게시글 목록 (제목, 작성자, 날짜, 조회수)

2. src/components/post/PostItem.vue
   - 개별 게시글 항목

3. src/components/post/PostForm.vue
   - 게시글 작성/수정 폼

4. src/components/post/PostContent.vue
   - 게시글 본문 표시

5. src/components/post/CommentList.vue
   - 댓글 목록

6. src/components/post/CommentForm.vue
   - 댓글 작성 폼

7. src/components/post/CommentItem.vue
   - 개별 댓글 항목

### 페이지
1. src/views/post/PostListView.vue
2. src/views/post/PostDetailView.vue
3. src/views/post/PostCreateView.vue
4. src/views/post/PostEditView.vue

### 라우트
- 파일: src/router/routes/post.routes.ts
- /posts → PostListView
- /posts/create → PostCreateView (인증 필요)
- /posts/:id → PostDetailView
- /posts/:id/edit → PostEditView (인증 필요, 작성자만)
```

---

## 📝 예시 3: 대시보드 위젯 기능

```
대시보드 위젯 기능을 생성해줘.

### 기능 개요
대시보드에 표시할 통계 위젯들 (매출, 주문, 사용자, 차트)

### API
- 파일: src/api/dashboard.api.ts
- 엔드포인트 베이스: /dashboard
- 필요한 API:
  - getStats() → DashboardStats
  - getSalesChart(period) → ChartData
  - getRecentOrders(limit) → Order[]
  - getTopProducts(limit) → Product[]

### 타입 정의
- 파일: src/types/dashboard.types.ts
- DashboardStats { totalSales, totalOrders, totalUsers, conversionRate }
- ChartData { labels: string[], datasets: Dataset[] }
- Dataset { label, data: number[], backgroundColor? }

### 스토어
- 파일: src/stores/dashboard.store.ts
- 상태:
  - stats: DashboardStats | null
  - salesChart: ChartData | null
  - recentOrders: Order[]
  - topProducts: Product[]
  - isLoading: boolean
  - selectedPeriod: 'week' | 'month' | 'year'
- 액션:
  - fetchDashboardData() - 전체 데이터 로드
  - fetchSalesChart(period)
  - setPeriod(period)
  - refresh()

### 컴포넌트
1. src/components/dashboard/StatCard.vue (이미 있으면 확장)
   - Props: title, value, icon, trend, trendValue

2. src/components/dashboard/SalesChart.vue
   - Props: data, period
   - Emits: periodChange
   - Chart.js 또는 vue-chartjs 사용

3. src/components/dashboard/RecentOrdersWidget.vue
   - Props: orders
   - 최근 주문 목록 위젯

4. src/components/dashboard/TopProductsWidget.vue
   - Props: products
   - 인기 상품 위젯

5. src/components/dashboard/DashboardGrid.vue
   - 위젯 레이아웃 그리드

### 페이지
- src/views/dashboard/DashboardView.vue 수정
  - DashboardGrid 사용
  - 위젯들 배치
  - 로딩 상태 처리

### 라우트
- /dashboard (기존 라우트 사용)
```

---

## 🎯 기능 단위 개발 순서

1. **타입 정의** → 데이터 구조 명확화
2. **API 레이어** → 서버 통신 정의
3. **스토어** → 상태 관리 구현
4. **컴포넌트** → UI 구현 (하위 → 상위)
5. **페이지** → 컴포넌트 조합
6. **라우트** → 네비게이션 연결
7. **통합 테스트** → 전체 플로우 확인
