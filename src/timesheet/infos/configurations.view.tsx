import { FC, useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Sync as SyncIcon } from '@mui/icons-material';
import { Grid, IconButton, Skeleton, Typography } from '@mui/material';

import { Form } from '@components/form';

import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { timesheetAuthFormSchema } from '@/timesheet/infos/create/schema';
import { useTimesheetInfosCreate } from '@/timesheet/infos/create/service';
import { TimesheetInfosCreate } from '@/timesheet/infos/create/types';
import { useGetOneTimesheetInfos } from '@/timesheet/infos/read/service';
import { useTimesheetInfosUpdate } from '@/timesheet/infos/update/service';
import { zodResolver } from '@hookform/resolvers/zod';

export const TimesheetConfigurations: FC = () => {
  const { wipeUser } = useUserStore();

  const { data, loading, error } = useGetOneTimesheetInfos();

  const timesheetInfosCreateForm = useForm<TimesheetInfosCreate.Input>({
    resolver: zodResolver(timesheetAuthFormSchema),
  });

  const [saveInfos] = useTimesheetInfosCreate();
  const [updateInfos] = useTimesheetInfosUpdate();

  const handleSave = async (
    formData: TimesheetInfosCreate.Input
  ): Promise<void> => {
    try {
      const options = { variables: { data: formData } };
      const response = !data?.getOneTimesheetInfos
        ? await saveInfos(options)
        : await updateInfos(options);

      if (response.data) {
        toast.success('Autenticação salva com sucesso!');
      }
    } catch (e) {
      toast.error(`Erro ao salvar o autenticação: ${e}`);
    }
  };

  useEffect(() => {
    if (data) {
      timesheetInfosCreateForm.setValue(
        'login',
        data.getOneTimesheetInfos.login
      );
    }
  }, [data, timesheetInfosCreateForm]);

  useEffect(() => {
    const message = errorHandler(error);

    if (message === 'Unauthorized') wipeUser();
  }, [error, wipeUser]);

  return (
    <Grid container spacing={1} px={8}>
      <Grid
        item
        xs={3}
        style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}
        paddingRight={2}
      >
        <Typography variant="h5" component="h2" textAlign="right">
          Timesheet login
        </Typography>
      </Grid>
      <Grid item xs={9} container spacing={1}>
        <FormProvider {...timesheetInfosCreateForm}>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            component="form"
            onSubmit={timesheetInfosCreateForm.handleSubmit(handleSave)}
          >
            <Grid item xs={7}>
              {loading ? (
                <Skeleton width="100%" height={40} sx={{ transform: 'none' }} />
              ) : (
                <Form.Input
                  label="E-mail"
                  type="email"
                  name="login"
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={4}>
              <Form.Input
                label="Senha"
                type="password"
                name="password"
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 4,
                  paddingTop: 7,
                  paddingBottom: 7,
                }}
                aria-label="Salvar"
                type="submit"
              >
                <SyncIcon color="disabled" />
              </IconButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
};
