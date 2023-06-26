import React, { memo, useContext } from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

import { ConfigContext, ModelContext, ToastContext } from '@shared';

import { Props } from './interface';
import { findIncompatibleOptions } from './utils';

import './card-config.scss';

const Component: React.FC<Props> = ({ option }) => {
  const { handleBadges, filter } = useContext(ConfigContext);
  const { model } = useContext(ModelContext);
  const { notifyError } = useContext(ToastContext);

  const handleOption = () => {
    const incompatibleOptions = findIncompatibleOptions(model, option.name, filter);
    if (incompatibleOptions.length) {
      notifyError(`Для установки ${option.name} нужно добавить ${incompatibleOptions}`);
    } else {
      handleBadges(option);
    }
  }

  return (
      <ListItemButton
        selected={ !!filter.filter(f => f.name === option.name).length }
        onClick={ handleOption }
        sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
      >
        <ListItemText primary={ option.name } />
        <ListItemText secondary={ option.cost } sx={{ textAlign: 'end' }} />
      </ListItemButton>
  );
};

export const CardConfig = memo(Component);
