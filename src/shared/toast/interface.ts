export interface ToastProviderConfig {
  notifyError: (message: string) => void;
  notifyWarn: (message: string) => void;
}
