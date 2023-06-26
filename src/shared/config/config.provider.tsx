import React, { createContext, useState } from 'react';

import { Option, Color } from 'scene/interface';

import { ConfigParams, ConfigProviderConfig } from './interface';
import { defaultState } from './const';

export const ConfigContext = createContext<ConfigProviderConfig>(null);

export const ConfigProvider = ({ children }: { children: React.ReactElement }) => {
  const config = useConfigProvider();

  return (
    <ConfigContext.Provider value={ config }>
      { children }
    </ConfigContext.Provider>
  );
}

const useConfigProvider = (): ConfigProviderConfig => {
  const [state, setState] = useState<ConfigParams>(defaultState);

  const handleBadges = (badge: Option): void => {
    setState(prev => {
      const isNewBagde = !prev.filter.includes(badge);

      return {
        ...prev,
        filter: isNewBagde
          ? [...prev.filter, badge]
          : prev.filter
        };
    });
  };

  const changeColor = (color: Color): void => {
    setState(prev => ({ ...prev, color }));
  };

  const deleteBadge = (badge: Option): void => {
    setState(prev => ({ ...prev, filter: prev.filter.filter(b => b !== badge) }));
  }

  const clearFilter = (): void => { setState(defaultState) }

  return { ...state, handleBadges, changeColor, deleteBadge, clearFilter };
}
