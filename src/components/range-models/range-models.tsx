import React, { memo, useContext } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, List } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ModelContext } from '@shared';
import { Model } from '@components';

import { Props } from './interface';

import './range-models.scss';

const Component: React.FC<Props> = ({ models }) => {
  const { getOpenRange } = useContext(ModelContext)

  return (
    <Paper elevation={ 3 } sx={{ mt: 2 }} >
      <Accordion>
        <AccordionSummary onClick={ getOpenRange } className="range-models" expandIcon={ <ExpandMoreIcon /> }>
          <Typography variant="h4" align="center" fontSize={ 16 }>
            Модельный ряд
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <List component="nav" sx={{ maxHeight: 250, overflow: "auto" }}>
            { models.map((card, index) => <Model key={ index } card={ card } /> ) }
          </List>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export const RangeModels = memo(Component);
