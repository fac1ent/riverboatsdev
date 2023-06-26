import React, { memo } from 'react';
import { ToastContainer } from 'react-toastify';

import { Scene } from './scene';

import './App.scss';

const Component: React.FC = () => {
  return (
    <div className="App">
      <Scene />
      <ToastContainer />
    </div>
  );
}

export const App = memo(Component);
