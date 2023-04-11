import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';

import { FormTypes } from '@components/form/types';

export const Input: FC<FormTypes.Input> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (props.boolean) {
    return (
      <FormGroup>
        <FormControlLabel
          label={props.label}
          control={<Switch {...register(props.name)} />}
        />
      </FormGroup>
    );
  }

  return (
    <TextField
      {...props}
      fullWidth
      {...register(props.name)}
      error={!!errors[props.name]}
      helperText={errors[props.name] && `${errors[props.name]?.message}`}
    />
  );
};
