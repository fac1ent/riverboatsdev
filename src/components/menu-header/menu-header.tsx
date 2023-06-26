import React, { memo } from 'react';
import isMobile from 'ismobilejs';

import Paper from '@mui/material/Paper';

import { Badge } from '@components';

import { Props } from './interface';

import './menu-header.scss';

const Component: React.FC<Props> = ({ filter }) => {

  return (
    <div className="box-position">
      <Paper
        component="div"
        sx={{
          display: filter.length ? 'flex' : 'none',
          alignItems: 'left',
          flexWrap: 'wrap',
          gap: 1,
          m: 0,
          mt: isMobile(window.navigator).any ? 2 : 0,
          py: 1,
          px: isMobile(window.navigator).any ? 2 : 1,
          flexDirection: isMobile(window.navigator).any ? 'row' : 'column',
          backgroundColor: isMobile(window.navigator).any ? 'transparent' :'rgba(0, 0, 0, .2)',
          boxShadow: 'none',
          WebkitAlignItems: 'flex-start',
        }}
      >
        {
          filter.map(((item, index) => <Badge option={ item } key={ index } /> ))
        }
      </Paper>
    </div>
  );
};

export const MenuHeader = memo(Component);
