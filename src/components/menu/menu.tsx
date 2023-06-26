import React, { memo, useContext } from 'react';
import isMobile from 'ismobilejs';

import { Button, CircularProgress } from '@mui/material';
import { ModelContext } from '@shared';
import { BtnBackTop, Stack, RangeModels, MenuHeader } from '@components';

import { Props } from './interface';

import './menu.scss'

const Component: React.FC<Props> = ({ filter, loading, toggleOrderModal }) => {
  const { model, models } = useContext(ModelContext);
  const { options } = model;
  return (
    <div className="menu">
      <MenuHeader filter={ filter } />
      <div className="stack-body-cards">
        <RangeModels model={ model } models={ models } />
        <Stack name="Аксессуары" options={ options } />
      </div>
      <div className="position">
        <Button variant="contained" className="button" onClick={ toggleOrderModal }>
          { loading ? <CircularProgress color="inherit" disableShrink /> : 'Заказать' }
        </Button>
      </div>
      { isMobile(window.navigator).any && <BtnBackTop /> }
    </div>
  );
};

export const Menu = memo(Component);
