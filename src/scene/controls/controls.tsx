import React, { memo, useEffect, useState } from 'react';
import isMobile from 'ismobilejs';

import { Backdrop, Fab, SpeedDial, SpeedDialAction } from '@mui/material';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';

import { Props } from './interface';

import './controls.scss';

const Component: React.FC<Props> = ({ toggleBackground, toggleOrderModal }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ismobile = isMobile(navigator).any;
  const [actions, setActions] = useState([]);

  useEffect(()=> {
    !ismobile && setActions([...actions, {icon: <WallpaperIcon/>, name: 'Фон', callback: toggleBackground}]);
  }, [])

  return (
    <div className="controls-wrapper">
      {
        ismobile && (
          <Fab color="primary" className="mobile-apply" onClick={ toggleOrderModal }>
            <CheckIcon />
          </Fab>
        )
      }
      <Backdrop open={ open } />
      {
        Boolean(actions.length) && (
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            icon={ <SettingsIcon /> }
            onClose={ handleClose }
            onOpen={ handleOpen }
            open={ open }
            direction="down"
          >
            {
              actions.map((action: any) => (
                <SpeedDialAction
                  key={ action.name }
                  icon={ action.icon }
                  tooltipTitle={ action.name }
                  tooltipOpen
                  onClick={ () => { action.callback(); handleClose(); } }
                />
              ))
            }
          </SpeedDial>
        )
      }
    </div>
  );
};

export const Controls = memo(Component);
