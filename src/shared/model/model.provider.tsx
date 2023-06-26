import React, { createContext, useState } from 'react';

import boatsJson from '@json/boats.json';
import { Model } from 'scene/interface';

import { ModelProviderConfig } from './interface';;

export const ModelContext = createContext<ModelProviderConfig>(null);

export const ModelProvider = ({ children }: { children: React.ReactElement }) => {
  const config = useModelProvider();

  return (
    <ModelContext.Provider value={ config }>
      { children }
    </ModelContext.Provider>
  );
}

const useModelProvider = (): ModelProviderConfig => {
  const [model, setModel] = useState(boatsJson.boats[0]);
  const [openRange, setOpenRange] = useState(false)
  const getOpenRange = () => {
    setOpenRange(!openRange)
  }

  const handleModels = (newModel: Model): void => {
    setModel(newModel);
  };

  return { handleModels, model, models: boatsJson.boats, openRange, getOpenRange };
}
