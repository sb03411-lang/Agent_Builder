# API 레이어 생성 프롬프트 템플릿

> 새로운 API 레이어를 생성할 때 사용하는 템플릿입니다.

---

## 📋 템플릿

```
{도메인}의 API 레이어를 생성해줘.

### 기본 정보
- 파일명: {도메인}.api.ts
- 위치: src/api/{도메인}.api.ts
- 엔드포인트 베이스: {base_path}

### 엔드포인트 목록
{엔드포인트_상세}

### 타입 정의
- 위치: src/types/{도메인}.types.ts
{타입_목록}

### 참고
- core/api/client 사용
- CLAUDE.md API 패턴 따라줘
- 모든 함수에 반환 타입 명시
```

---

## 📝 예시 1: 기본 CRUD API

```
product의 API 레이어를 생성해줘.

### 기본 정보
- 파일명: product.api.ts
- 위치: src/api/product.api.ts
- 엔드포인트 베이스: /products

### 엔드포인트 목록

1. getProducts
   - Method: GET
   - Path: /products
   - Query: { page?, limit?, search?, category? }
   - Response: PaginatedResponse<Product>

2. getProductById
   - Method: GET
   - Path: /products/:id
   - Response: Product

3. createProduct
   - Method: POST
   - Path: /products
   - Body: CreateProductDto
   - Response: Product

4. updateProduct
   - Method: PUT
   - Path: /products/:id
   - Body: UpdateProductDto
   - Response: Product

5. deleteProduct
   - Method: DELETE
   - Path: /products/:id
   - Response: void

### 타입 정의
- 위치: src/types/product.types.ts

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

interface CreateProductDto {
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
}

interface UpdateProductDto extends Partial<CreateProductDto> {}

interface ProductQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: string
}

### 참고
- PaginatedResponse는 core/api/types.ts에서 import
```

---

## 📝 예시 2: 중첩 리소스 API

```
order의 API 레이어를 생성해줘.

### 기본 정보
- 파일명: order.api.ts
- 위치: src/api/order.api.ts
- 엔드포인트 베이스: /orders

### 엔드포인트 목록

1. getOrders
   - Method: GET
   - Path: /orders
   - Query: { page?, limit?, status?, startDate?, endDate? }
   - Response: PaginatedResponse<Order>

2. getOrderById
   - Method: GET
   - Path: /orders/:id
   - Response: OrderDetail (items 포함)

3. createOrder
   - Method: POST
   - Path: /orders
   - Body: CreateOrderDto
   - Response: Order

4. updateOrderStatus
   - Method: PATCH
   - Path: /orders/:id/status
   - Body: { status: OrderStatus }
   - Response: Order

5. cancelOrder
   - Method: POST
   - Path: /orders/:id/cancel
   - Body: { reason?: string }
   - Response: Order

6. getOrderItems (중첩 리소스)
   - Method: GET
   - Path: /orders/:orderId/items
   - Response: OrderItem[]

### 타입 정의
- 위치: src/types/order.types.ts

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

interface Order {
  id: number
  orderNumber: string
  userId: number
  status: OrderStatus
  totalAmount: number
  createdAt: string
  updatedAt: string
}

interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface OrderDetail extends Order {
  items: OrderItem[]
  user: {
    id: number
    name: string
    email: string
  }
}

interface CreateOrderDto {
  items: {
    productId: number
    quantity: number
  }[]
  shippingAddress: string
  note?: string
}
```

---

## 📝 예시 3: 파일 업로드 API

```
upload의 API 레이어를 생성해줘.

### 기본 정보
- 파일명: upload.api.ts
- 위치: src/api/upload.api.ts
- 엔드포인트 베이스: /uploads

### 엔드포인트 목록

1. uploadImage
   - Method: POST
   - Path: /uploads/image
   - Body: FormData (file)
   - Headers: Content-Type: multipart/form-data
   - Response: UploadResult

2. uploadImages (다중)
   - Method: POST
   - Path: /uploads/images
   - Body: FormData (files[])
   - Response: UploadResult[]

3. deleteFile
   - Method: DELETE
   - Path: /uploads/:fileId
   - Response: void

### 타입 정의
- 위치: src/types/upload.types.ts

interface UploadResult {
  id: string
  url: string
  filename: string
  size: number
  mimeType: string
}

### 구현 참고
- FormData 사용 시 Content-Type 헤더 제거 (브라우저가 자동 설정)
- axios config에 headers: { 'Content-Type': 'multipart/form-data' } 사용하지 말 것
```

---

## 🔧 API 파일 기본 구조

```typescript
// src/api/{domain}.api.ts
import client from '@/core/api/client'
import type { PaginatedResponse } from '@/core/api/types'
import type { 
  Entity, 
  CreateEntityDto, 
  UpdateEntityDto,
  EntityQueryParams 
} from '@/types/{domain}.types'

export const {domain}Api = {
  // 목록 조회
  getAll: (params?: EntityQueryParams) =>
    client.get<PaginatedResponse<Entity>>('/endpoint', { params }),

  // 단건 조회
  getById: (id: number) =>
    client.get<Entity>(`/endpoint/${id}`),

  // 생성
  create: (data: CreateEntityDto) =>
    client.post<Entity>('/endpoint', data),

  // 수정
  update: (id: number, data: UpdateEntityDto) =>
    client.put<Entity>(`/endpoint/${id}`, data),

  // 삭제
  delete: (id: number) =>
    client.delete(`/endpoint/${id}`),
}
```
