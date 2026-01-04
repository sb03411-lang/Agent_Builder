import apiClient from '@/core/api/client'
import type { ApiResponse, PaginatedResponse } from '@/core/api/types'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
}

export interface GetUsersParams {
  page?: number
  limit?: number
  search?: string
}

export const userApi = {
  getUsers: async (params?: GetUsersParams): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<PaginatedResponse<User>>('/users', { params })
    return response.data
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return response.data
  },

  updateUser: async (id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, data)
    return response.data
  }
}
