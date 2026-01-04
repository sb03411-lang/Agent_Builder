import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from './types'
import {
  ApiError,
  NetworkError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ServerError
} from '@/core/errors'

export const handleApiError = (error: AxiosError<ApiErrorResponse>): never => {
  if (!error.response) {
    throw new NetworkError()
  }

  const { status, data } = error.response
  const message = data?.message || '알 수 없는 오류가 발생했습니다.'

  switch (status) {
    case 401:
      throw new UnauthorizedError(message)
    case 403:
      throw new ForbiddenError(message)
    case 404:
      throw new NotFoundError(message)
    case 500:
    case 502:
    case 503:
      throw new ServerError(message)
    default:
      throw new ApiError(message, status, data?.code)
  }
}
