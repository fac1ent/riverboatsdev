import React, { createContext, useCallback } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ToastProviderConfig } from './interface';
import { toastConfig } from './const';

export const ToastContext = createContext<ToastProviderConfig>(null);

export const ToastProvider = ({ children }: { children: React.ReactElement }) => {
  const config = useToastProvider();

  return (
    <ToastContext.Provider value={ config }>
      { children }
    </ToastContext.Provider>
  );
}

const useToastProvider = (): ToastProviderConfig => {

  const notifyError = useCallback((message: string) => {
    toast.error(message, toastConfig);
  }, []);

  const notifyWarn = useCallback((message: string) => {
    toast.warn(message, toastConfig);
  }, []);

  return { notifyError, notifyWarn };
}
