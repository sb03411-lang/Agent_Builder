import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { ApiErrorResponse } from './types'
import { handleApiError } from './error-handler'

export const setupInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  client.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorResponse>) => {
      handleApiError(error)
    }
  )
}
