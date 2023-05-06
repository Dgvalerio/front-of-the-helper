import { useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NextPage } from 'next';

import { ApolloError } from '@apollo/client';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import { Form } from '@components/form';
import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useTimesheetStore from '@store/timesheet/store';
import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';
import { RouteTypes } from '@utils/routes';

import { AppointmentForm } from '@/timesheet/appointment/form';
import { appointmentSchema } from '@/timesheet/appointment/schema';
import { useTimesheetAppointmentCreate } from '@/timesheet/appointment/service';
import {
  AppointmentSchema,
  TimesheetAppointmentCreate,
} from '@/timesheet/appointment/types';
import { zodResolver } from '@hookform/resolvers/zod';

const TimesheetAppointmentCreatePage: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Private);

  const { clients } = useTimesheetStore();
  const { disableLoad } = useUiStore();
  const { wipeUser } = useUserStore();

  const [create, { loading, error }] = useTimesheetAppointmentCreate();

  const appointmentForm = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
  });
  const { fields, append, insert, remove } = useFieldArray({
    name: 'appointments',
    control: appointmentForm.control,
  });

  const handleSubmit = async ({
    appointments,
  }: AppointmentSchema): Promise<void> => {
    try {
      const { data } = await create({
        variables: {
          data: {
            appointments: appointments.map((a) => ({
              client: `${a.client?.value}`,
              project: `${a.project?.value}`,
              category: `${a.category?.value}`,
              date: a.date,
              startTime: a.start,
              endTime: a.end,
              description: a.description,
            })),
          },
        },
      });

      if (data?.createTimesheetAppointments) {
        const success: TimesheetAppointmentCreate.Output[] = [];
        const failure: TimesheetAppointmentCreate.Output[] = [];

        data.createTimesheetAppointments.forEach((item) =>
          item.success ? success.push(item) : failure.push(item)
        );

        if (success.length > 0)
          toast.success(
            `${success.length} de ${data.createTimesheetAppointments.length} apontamentos foram realizados com sucesso!`
          );
        if (failure.length > 0) {
          toast.error(
            `${failure.length} de ${data.createTimesheetAppointments.length} apontamentos falharam ao ser realizados!`
          );

          remove();

          failure.map((item, index) => {
            const client = clients.find(({ id }) => String(id) === item.client);
            const project = client?.projects.find(
              ({ id }) => String(id) === item.project
            );
            const category = project?.categories.find(
              ({ id }) => String(id) === item.category
            );

            appointmentForm.setError(`appointments.${index}`, {
              message: item.errorMessage,
            });

            append({
              client: { label: `${client?.title}`, value: item.client },
              project: { label: `${project?.name}`, value: item.project },
              category: { label: `${category?.name}`, value: item.category },
              date: item.date,
              start: item.startTime,
              end: item.endTime,
              description: item.description,
            });
          });
        }
      } else {
        toast.warn('Houve uma falha ao realizar esses apontamentos!');
      }
    } catch (e) {
      const error = e as ApolloError;

      toast.error(error.message || `Falha realizar apontamentos: ${error}`);
    }
  };

  const handleAddBetween = (position: number): void =>
    insert(position, appointmentForm.getValues('appointments')[position - 1]);

  useEffect(() => {
    const message = errorHandler(error);

    if (message === 'Unauthorized') wipeUser();
  }, [error, wipeUser]);

  useEffect(() => {
    remove();

    const now = new Date();
    const iso = now.toLocaleDateString('pt-BR');
    const [day, month, year] = iso.split('/');
    const date = `${year}-${month}-${day}`;

    append({
      client: undefined,
      project: undefined,
      category: undefined,
      date,
      start: '00:00',
      end: '00:01',
      description: ``,
    });
  }, [append, remove]);

  useEffect(
    () => disableLoad(Load.RedirectToTimesheetAppointmentCreate),
    [disableLoad]
  );

  if (!pass) return <Loading />;

  return (
    <Box>
      <Typography variant="h4" component="h1" mb={2}>
        Adicionar Apontamento
      </Typography>
      <FormProvider {...appointmentForm}>
        <Form.Container spacing={1} xs={12} onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <AppointmentForm
              field={field}
              index={index}
              add={handleAddBetween}
              key={field.id}
            />
          ))}
          <Grid item xs={12} mt={2}>
            <Divider />
          </Grid>
          {fields.length > 0 && (
            <Grid item xs={12}>
              <Button type="submit" variant="outlined" fullWidth>
                Enviar apontamentos
              </Button>
            </Grid>
          )}
        </Form.Container>
      </FormProvider>
      {loading && (
        <Loading
          texts={[
            'Seus apontamentos estão sendo enviados',
            'Isso pode demorar um pouco',
            'Já já termina, tenha fé',
          ]}
        />
      )}
    </Box>
  );
};

export default TimesheetAppointmentCreatePage;
