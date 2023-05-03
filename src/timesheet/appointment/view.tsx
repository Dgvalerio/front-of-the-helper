import { FC, useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { QueryResult } from '@apollo/client';

import { Button, Grid } from '@mui/material';

import { Form } from '@components/form';

import useTimesheetStore from '@store/timesheet/store';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { GithubCommitRead } from '@/github/commit/read/types';
import { AppointmentForm } from '@/timesheet/appointment/form';
import { appointmentSchema } from '@/timesheet/appointment/schema';
import { GroupedListSkeleton } from '@/timesheet/appointment/skeleton';
import { AppointmentListContainer } from '@/timesheet/appointment/styles';
import { AppointmentSchema } from '@/timesheet/appointment/types';
import { zodResolver } from '@hookform/resolvers/zod';

export const GroupedList: FC<{
  result: QueryResult<GithubCommitRead.QueryGrouped, GithubCommitRead.Options>;
}> = ({ result: { data, loading, error } }) => {
  const { wipeUser } = useUserStore();
  const { clients } = useTimesheetStore();

  const appointmentForm = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
  });

  const { fields, append, insert, remove } = useFieldArray({
    name: 'appointments',
    control: appointmentForm.control,
  });

  const handleSubmit = (data: AppointmentSchema): void => {
    const json = JSON.stringify(
      data.appointments.map(
        ({ client, project, category, date, start, end, description }) => ({
          client: client?.value,
          project: project?.value,
          category: category?.value,
          date,
          start,
          end,
          description,
        })
      ),
      null,
      2
    );
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'appointments.json';
    link.click();
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
    const message = errorHandler(error);

    if (message === 'Unauthorized') wipeUser();
  }, [error, wipeUser]);

  if (loading) return <GroupedListSkeleton />;

  return (
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
                Processar e gerar apontamentos
              </Button>
            </Grid>
          )}
        </Form.Container>
      </FormProvider>
    </AppointmentListContainer>
  );
};
