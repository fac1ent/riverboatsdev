import React from 'react';

import { ConfigProvider, ModelProvider, ToastProvider } from '@shared';

import { App } from './App';

export const AppInitializer: React.FC = () => {
  return (
    <ModelProvider>
      <ConfigProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ConfigProvider>
    </ModelProvider>
  );
}
