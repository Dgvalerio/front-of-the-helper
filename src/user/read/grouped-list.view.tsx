import { FC, useEffect, useMemo } from 'react';
import * as React from 'react';
import {
  FieldArrayWithId,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

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

import useTimesheetStore from '@store/timesheet/store';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { GithubCommitRead } from '@/github/commit/read/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

export const appointmentSchema = z.object({
  appointments: z
    .array(
      z.object({
        client: z
          .object({ label: z.string(), value: z.string() })
          .refine(
            (data) =>
              !(
                data === null ||
                data.value === undefined ||
                data.label === undefined
              ),
            {
              message: 'O cliente é obrigatório.',
            }
          ),
        project: z
          .object({ label: z.string(), value: z.string() })
          .refine(
            (data) =>
              !(
                data === null ||
                data.value === undefined ||
                data.label === undefined
              ),
            {
              message: 'O projeto é obrigatório.',
            }
          ),
        category: z
          .object({ label: z.string(), value: z.string() })
          .refine(
            (data) =>
              !(
                data === null ||
                data.value === undefined ||
                data.label === undefined
              ),
            {
              message: 'A categoria é obrigatória.',
            }
          ),
        date: z.string().nonempty('A data é obrigatória.'),
        start: z.string().nonempty('A horário inicial é obrigatória.'),
        end: z.string().nonempty('A horário final é obrigatória.'),
        description: z.string().nonempty('A descrição é obrigatória.'),
      })
    )
    .min(1, 'Insira pelo menos 1 apontamento'),
});

interface AppointmentSchema {
  appointments: {
    client?: { label: string; value: string };
    project?: { label: string; value: string };
    category?: { label: string; value: string };
    date: string;
    start: string;
    end: string;
    description: string;
  }[];
}

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

const AppointmentForm: FC<{
  field: FieldArrayWithId<AppointmentSchema, 'appointments'>;
  index: number;
}> = ({ field, index }) => {
  const { watch, setValue } = useFormContext<AppointmentSchema>();

  const { clients } = useTimesheetStore();

  const selectedClient = watch(`appointments.${index}.client`);
  const client = useMemo(() => {
    if (!selectedClient) return undefined;

    setValue(`appointments.${index}.project`, undefined);
    setValue(`appointments.${index}.category`, undefined);

    return clients.find(({ title }) => title === selectedClient.label);
  }, [clients, index, selectedClient, setValue]);
  const clientOptions = useMemo(
    () => clients.map(({ id, title }) => ({ value: id, label: title })),
    [clients]
  );

  const selectedProject = watch(`appointments.${index}.project`);
  const project = useMemo(() => {
    if (!selectedProject) return undefined;

    setValue(`appointments.${index}.category`, undefined);

    return client?.projects.find(({ name }) => name === selectedProject.label);
  }, [client?.projects, index, selectedProject, setValue]);
  const projectOptions = useMemo(
    () =>
      client?.projects.map(({ id, name }) => ({
        value: String(id),
        label: name,
      })) || [],
    [client?.projects]
  );
  const categoryOptions = useMemo(
    () =>
      project?.categories.map(({ id, name }) => ({
        value: String(id),
        label: name,
      })) || [],
    [project?.categories]
  );

  return (
    <Grid item xs={12} key={field.id}>
      <Card>
        <CardContent>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={4}>
              <Form.Input
                label="Cliente"
                name={`appointments.${index}.client`}
                type="select"
                options={clientOptions}
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Form.Input
                label="Projeto"
                name={`appointments.${index}.project`}
                type="select"
                options={projectOptions}
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Form.Input
                label="Category"
                name={`appointments.${index}.category`}
                type="select"
                options={categoryOptions}
                size="small"
              />
            </Grid>
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
                rows={6}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const GroupedList: FC<{
  result: QueryResult<GithubCommitRead.QueryGrouped, GithubCommitRead.Options>;
}> = ({ result: { data, loading, error } }) => {
  const { wipeUser } = useUserStore();
  const { clients } = useTimesheetStore();

  const appointmentForm = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
  });

  const { fields, append, remove } = useFieldArray({
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

  if (loading) return <ListSkeleton />;

  return (
    <FormProvider {...appointmentForm}>
      <Form.Container spacing={1} xs={12} onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <AppointmentForm field={field} index={index} key={field.id} />
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
  );
};
