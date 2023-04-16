import { FC, useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { QueryResult } from '@apollo/client';

import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Skeleton,
} from '@mui/material';

import { Form } from '@components/form';

import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { GithubCommitRead } from '@/github/commit/read/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

export const appointmentSchema = z.object({
  appointments: z
    .array(
      z.object({
        date: z.string().nonempty('A data é obrigatório.'),
        start: z.string().nonempty('O horário inicial é obrigatório.'),
        end: z.string().nonempty('O horário final é obrigatório.'),
        description: z.string().nonempty('A descrição é obrigatória.'),
      })
    )
    .min(1, 'Insira pelo menos 1 apontamento'),
});

type AppointmentSchema = z.infer<typeof appointmentSchema>;

const ListSkeleton: FC<{ length?: number }> = ({ length }) => (
  <Grid container spacing={1} alignContent="center">
    {[...new Array(length || 3)].map((_, i) => (
      <Grid item xs={12} key={i}>
        <Grid item xs={12} container component={Paper} p={0.5}>
          <Grid item xs={4} p={0.5}>
            <Skeleton height={40} sx={{ transform: 'none' }} />
          </Grid>
          <Grid item xs={4} p={0.5}>
            <Skeleton height={40} sx={{ transform: 'none' }} />
          </Grid>
          <Grid item xs={4} p={0.5}>
            <Skeleton height={40} sx={{ transform: 'none' }} />
          </Grid>
          <Grid item xs={12} p={0.5}>
            <Skeleton height={128} sx={{ transform: 'none' }} />
          </Grid>
        </Grid>
      </Grid>
    ))}
  </Grid>
);

export const GroupedList: FC<{
  result: QueryResult<GithubCommitRead.QueryGrouped, GithubCommitRead.Options>;
}> = ({ result: { data, loading, error } }) => {
  const { wipeUser } = useUserStore();

  const appointmentForm = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'appointments',
    control: appointmentForm.control,
  });

  const handleSubmit = (data: AppointmentSchema): void => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'appointments.json';
    link.click();
  };

  useEffect(() => {
    remove();

    data?.loadAndGroupGithubCommits.forEach((item) =>
      item.commits.forEach((commit) =>
        append({
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
  }, [append, data, remove]);

  useEffect(() => {
    const message = errorHandler(error);

    if (message === 'Unauthorized') wipeUser();
  }, [error, wipeUser]);

  if (loading) return <ListSkeleton />;

  return (
    <FormProvider {...appointmentForm}>
      <Form.Container spacing={1} xs={12} onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <Grid item xs={12} key={field.id}>
            <Card>
              <CardContent>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={4}>
                    <Form.Input
                      label="Data"
                      name={`appointments.${index}.date`}
                      type="date"
                      size="small"
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Form.Input
                      label="Horário inicial"
                      name={`appointments.${index}.start`}
                      type="time"
                      size="small"
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Form.Input
                      label="Horário final"
                      name={`appointments.${index}.end`}
                      type="time"
                      size="small"
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Form.Input
                      label="Descrição"
                      name={`appointments.${index}.description`}
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="outlined" fullWidth>
            Processar e gerar apontamentos
          </Button>
        </Grid>
      </Form.Container>
    </FormProvider>
  );
};
