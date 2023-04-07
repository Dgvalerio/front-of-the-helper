import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid } from '@mui/material';

import { FormTypes } from '_/components/form/types';

export const Container: FC<FormTypes.Container> = (props) => {
  const { handleSubmit } = useFormContext();

  return (
    <Grid container justifyContent="center" alignItems="center" flex={1}>
      <Grid item xs={6}>
        <Grid
          container
          component="form"
          justifyContent="flex-end"
          spacing={4}
          onSubmit={handleSubmit(props.onSubmit)}
        >
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
};
