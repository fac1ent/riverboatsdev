import React, {memo, useContext} from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';

import { ModelContext } from '@shared';
import { CardConfig } from '..';
import { Props } from './interface';

import './stack.scss'

const Component: React.FC<Props> = ({ name, options }) => {
  const {openRange} = useContext(ModelContext);

  return (
    <Paper elevation={ 3 } sx={{ mt: 2 }}>
      <Accordion defaultExpanded={ true }>
        <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
          <Typography variant="h4" align="center" fontSize={ 16 }>
            { name }
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="config-height" data-openRange={ openRange }>
          {
            options.map((data, index) =>
              <CardConfig
                key={ index }
                option={ data }
              />
            )
          }
        </AccordionDetails>
      </Accordion>
    </Paper>

  );
};

export const Stack = memo(Component);
