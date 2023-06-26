import React, { memo, useContext } from 'react';
import Chip from '@mui/material/Chip';

import { ConfigContext, ModelContext, ToastContext } from '@shared';
import { Option } from 'scene/interface';

import { Props } from './interface';
import { findDepencies } from './utils';

import  './badge.scss'

const Component: React.FC<Props> = ({ option }) => {
  const { deleteBadge, filter } = useContext(ConfigContext);
  const { model } = useContext(ModelContext);
  const { notifyWarn } = useContext(ToastContext);

  const handleDelete = (option: Option) => {
    const depencies = findDepencies(option.name, model, filter);
    if (depencies.length) {
      notifyWarn(`Перед удалением ${option.name} нужно удалить ${depencies}`)
    } else {
      deleteBadge(option);
    }
  }

  return (
    <Chip
      color="primary"
      label={ option.name }
      clickable
      onDelete={ () => handleDelete(option) }
    />
  );
};

export const Badge = memo(Component);
