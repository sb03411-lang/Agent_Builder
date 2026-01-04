export const ERROR_MESSAGES = {
  NETWORK: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '인증이 필요합니다. 다시 로그인해주세요.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  VALIDATION: '입력값을 확인해주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다.'
} as const

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES
