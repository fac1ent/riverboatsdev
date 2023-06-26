import * as React from 'react';
import { IMaskInput } from 'react-imask';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Props } from './interface';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref: any) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+7 (000) 000 00 00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);


interface State {
  textmask: string;
  numberformat: string;
}

export const InputMask: React.FC<Props> = ({ setPhone }) => {
  const [values, setValues] = React.useState<State>({
    textmask: '',
    numberformat: '+7',
  });

  const handleChange = (phone: string) => {
    setValues({
      ...values,
      textmask: phone,
    });
    setPhone(phone);
  }

  return (
    <FormControl sx={{ width: "100%" }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input">Номер телефона</InputLabel>
      <Input
        value={ values.textmask }
        onChange={ event => handleChange(event.target.value) }
        name="textmask"
        id="formatted-text-mask-input"
        inputComponent={ TextMaskCustom as any }
      />
    </FormControl>
);
}
