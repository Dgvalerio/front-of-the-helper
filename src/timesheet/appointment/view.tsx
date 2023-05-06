import { FC, useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ApolloError, QueryResult } from '@apollo/client';

import { Button, Grid } from '@mui/material';

import { Form } from '@components/form';
import Loading from '@components/loading';

import useTimesheetStore from '@store/timesheet/store';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { GithubCommitRead } from '@/github/commit/read/types';
import { AppointmentForm } from '@/timesheet/appointment/form';
import { appointmentSchema } from '@/timesheet/appointment/schema';
import { useTimesheetAppointmentCreate } from '@/timesheet/appointment/service';
import { GroupedListSkeleton } from '@/timesheet/appointment/skeleton';
import { AppointmentListContainer } from '@/timesheet/appointment/styles';
import {
  AppointmentSchema,
  TimesheetAppointmentCreate,
} from '@/timesheet/appointment/types';
import { zodResolver } from '@hookform/resolvers/zod';

export const GroupedList: FC<{
  result: QueryResult<GithubCommitRead.QueryGrouped, GithubCommitRead.Options>;
}> = ({ result: { data, loading, error } }) => {
  const { wipeUser } = useUserStore();
  const { clients } = useTimesheetStore();

  const [create, { loading: creating, error: createError }] =
    useTimesheetAppointmentCreate();

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

  const handleAddBetween = (
    position: number,
    value: AppointmentSchema['appointments']
  ): void => insert(position, value);

  useEffect(() => {
    remove();

    data?.loadAndGroupGithubCommits.forEach((item) =>
      item.commits.forEach((commit) =>
        append({
          client: undefined,
          project: undefined,
          category: undefined,
          date: item.date,
          start: commit.startTime,
          end: commit.endTime,
          description: `${commit.items
            .map(
              (item) =>
                `Em "${item.repo}":\n` +
                item.commits
                  .map(
                    (subCommits, sci, { length }) =>
                      `- ${subCommits.description} (${subCommits.commit})${
                        length - 1 === sci ? '.' : ';'
                      }`
                  )
                  .join('\n')
            )
            .join('\n\n')}`,
        })
      )
    );
  }, [append, clients, data, remove]);

  useEffect(() => {
    const message = errorHandler(error || createError);

    if (message === 'Unauthorized') wipeUser();
  }, [error, createError, wipeUser]);

  if (loading) return <GroupedListSkeleton />;

  return (
    <>
      <AppointmentListContainer>
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
            {fields.length > 0 && (
              <Grid item xs={12}>
                <Button type="submit" variant="outlined" fullWidth>
                  Enviar apontamentos
                </Button>
              </Grid>
            )}
          </Form.Container>
        </FormProvider>
      </AppointmentListContainer>
      {creating && (
        <Loading
          texts={[
            'Seus apontamentos estão sendo enviados',
            'Isso pode demorar um pouco',
            'Já já termina, tenha fé',
          ]}
        />
      )}
    </>
  );
};
