import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { FormTypes } from '_/components/form/types';

export const Input: FC<FormTypes.Input> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      type={props.type}
      label={props.label}
      fullWidth
      {...register(props.name)}
      error={!!errors[props.name]}
      helperText={errors[props.name] && `${errors[props.name]?.message}`}
    />
  );
};
