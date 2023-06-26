import React, { memo, useEffect, useState } from 'react';

import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import { Fab } from '@mui/material';

import './btn-back-top.scss'

const Component = () => {
  const [top, setTop] = useState(true);
  const maxHeight = document.documentElement.scrollHeight;

  const handleScroll = () => {
    const bottomBorder = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const ActiveBottomBorder = bottomBorder - 120;

    if(window.pageYOffset <= 40) {
      setTop(true);
    } else if (window.pageYOffset >= ActiveBottomBorder) {
      setTop(false);
    }
  };

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scroll = () => {
    window.scrollTo({
      top: top ? maxHeight : 0,
      behavior: 'smooth',
    });
    setTop(!top);
  }

  return (
    <div className="btn-back-top" style={{bottom: top ? 180 : 20, transition: ".5s"}}>
      <Fab sx={{ py: 2 }} size="large" color="primary" onClick={ scroll }>
        <ArrowUpwardSharpIcon
          fontSize="large"
          sx={{
            transform: top ? "rotate(180deg)" : "rotate(-360deg)",
            transition: ".4s"
          }}
        />
      </Fab>
    </div>
  );
};

export const BtnBackTop = memo(Component);
