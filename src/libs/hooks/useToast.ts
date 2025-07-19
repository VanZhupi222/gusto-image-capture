import toast from 'react-hot-toast';

export interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export function useToast() {
  const showToast = {
    success: (message: string, options?: ToastOptions) => {
      return toast.success(message, options);
    },
    error: (message: string, options?: ToastOptions) => {
      return toast.error(message, options);
    },
    loading: (message: string, options?: ToastOptions) => {
      return toast.loading(message, options);
    },
    dismiss: (toastId?: string) => {
      toast.dismiss(toastId);
    },
  };

  return showToast;
} 