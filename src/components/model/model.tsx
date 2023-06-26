import React, { memo, useContext } from 'react';

import { ListItemButton, ListItemText } from '@mui/material';

import { ConfigContext, ModelContext } from '@shared';

import { Props } from './interface';

import './model.scss';

const Component: React.FC<Props> = ({ card }) => {
  const { handleModels, model: { index } } = useContext(ModelContext);
  const { clearFilter } = useContext(ConfigContext);
  
  return (
      <ListItemButton selected={ card.index === index } onClick={ () => {
        clearFilter();
        handleModels(card);
      }}>
        <ListItemText primary={ card.name }/>
      </ListItemButton>
  );
};

export const Model = memo(Component);
