import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';

import { FormTypes } from '@components/form/types';

export const Input: FC<FormTypes.Input> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = useMemo(() => {
    if (props.name.includes('.')) {
      const [object, index, name] = props.name.split('.');

      if (errors[object]) {
        const eObject = errors[object] as unknown as Record<
          string,
          Record<string, unknown>
        >[];

        if (eObject[+index] && eObject[+index][name]) {
          return eObject[+index][name];
        }
      }

      return undefined;
    } else {
      return errors[props.name];
    }
  }, [errors, props.name]);

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
      error={!!error}
      helperText={error && `${error?.message}`}
    />
  );
};
