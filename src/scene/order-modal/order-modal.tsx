import React, { memo, useCallback, useContext, useState } from 'react';

import {
  Backdrop, Box, Button,
  ButtonGroup, Chip, DialogActions,
  DialogContent, DialogTitle,
  Fade, Modal, Stack, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ConfigContext, ModelContext } from '@shared';
import { InputMask } from '@components';

import { Props } from './interface';
import { betweenStyle, style } from './const'

const Component: React.FC<Props> = ({ open, handleClose }) => {
  const { filter, color, deleteBadge } = useContext(ConfigContext);
  const { model } = useContext(ModelContext);
  const [phone, setPhone] = useState<string>('');

  const calcSumCost = () => {
    return filter.reduce((acc, option) =>
      acc + option.cost, 0) + model.cost + color.cost;
  }

  const configureEmailMessage = useCallback(() => {
    return `
      Модель: ${model.name}.%0D%0A
      Дополнительные опции: ${ filter.length ? filter.map(f => f.name) : 'Без опций'}.%0D%0A
      Цвет: ${color.name}.%0D%0A
      Телефон клиента: ${phone}.%0D%0A
    `
  }, [color.name, filter, model.name, phone]);

  const configureHref = useCallback(() => {
    const email = 'test@email.com';
    const body = configureEmailMessage();
    const subject = 'Заказ из конфигуратора';

    const href = `mailto:${email}?body=${body}&subject=${subject}`;
    return href;
  }, [configureEmailMessage]);


  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={ open }
      onClose={ handleClose }
      closeAfterTransition
      BackdropComponent={ Backdrop }
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={ open }>
        <Box sx={ style }>
          <DialogTitle sx={ betweenStyle } id="transition-modal-title" variant="h6" component="div">
            Детали заказа
            <CloseIcon onClick={ handleClose } />
          </DialogTitle>
          <DialogContent dividers>
            <Typography fontWeight="bold"> Модель </Typography>
            <Typography mb={ 2 } sx={ betweenStyle }>
              <Typography fontSize={ 14 }> { model.name }: </Typography>
              <Chip size="small" label={ `₽${model.cost}` } />
            </Typography>
            { filter.length > 0 &&
              (<>
                <Typography fontWeight="bold" fontSize={ 16 }> Акксесуары </Typography>
                <Stack direction="column" mb={ 2 } spacing={ 1 }>
                  {
                    filter.map((option, index) =>
                      <Typography fontSize={ 16 } sx={ betweenStyle } key={ index }>
                        { option.name }:
                          <Chip
                            size="small"
                            color="primary"
                            label={ `₽${option.cost}` }
                            onDelete={ () => deleteBadge(option) }
                          />
                      </Typography>
                    )
                  }
                </Stack>
              </>)
            }
            <Typography sx={ betweenStyle } fontWeight="bold" mb={ 2 } fontSize={ 16 }>
              Цвет
              <Chip size="small" label={ `${color.name}: ₽${color.cost}` } color="primary" />
            </Typography>
            <Typography sx={ betweenStyle }>
              Общая сумма заказа <Chip size="small" label={ `₽${calcSumCost()}` } />
            </Typography>
            <InputMask setPhone={ setPhone } />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <ButtonGroup variant="contained">
              <Button disabled={ phone.length !== 18 }>
                Связаться со мной
              </Button>
              <Button disabled={ phone.length !== 18 }>
                <a href={ configureHref() }> Отправить заявку </a>
              </Button>
            </ButtonGroup>
          </DialogActions>
        </Box>
      </Fade>
    </Modal>
  );
};

export const OrderModal = memo(Component);
