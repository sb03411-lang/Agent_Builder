import { toast } from 'vue-sonner'

export interface ToastOptions {
  description?: string
  duration?: number
}

export function useToast() {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration ?? 3000
    })
  }

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 5000
    })
  }

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration ?? 3000
    })
  }

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration ?? 4000
    })
  }

  return {
    success,
    error,
    info,
    warning
  }
}
