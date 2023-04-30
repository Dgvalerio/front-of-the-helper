import { FC, useMemo } from 'react';
import * as React from 'react';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';

import { Card, CardContent, Grid } from '@mui/material';

import { Form } from '@components/form';

import useTimesheetStore from '@store/timesheet/store';

import { AppointmentSchema } from '@/timesheet/appointment/types';

export const AppointmentForm: FC<{
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
            <Form.Input
              label="Cliente"
              name={`appointments.${index}.client`}
              type="select"
              options={clientOptions}
              size="small"
              xs={4}
            />
            <Form.Input
              label="Projeto"
              name={`appointments.${index}.project`}
              type="select"
              options={projectOptions}
              size="small"
              xs={4}
            />
            <Form.Input
              label="Category"
              name={`appointments.${index}.category`}
              type="select"
              options={categoryOptions}
              size="small"
              xs={4}
            />
            <Form.Input
              label="Data"
              name={`appointments.${index}.date`}
              type="date"
              size="small"
              disabled
              InputLabelProps={{ shrink: true }}
              xs={4}
            />
            <Form.Input
              label="Horário inicial"
              name={`appointments.${index}.start`}
              type="time"
              size="small"
              disabled
              InputLabelProps={{ shrink: true }}
              xs={4}
            />
            <Form.Input
              label="Horário final"
              name={`appointments.${index}.end`}
              type="time"
              size="small"
              disabled
              InputLabelProps={{ shrink: true }}
              xs={4}
            />
            <Form.Input
              label="Descrição"
              name={`appointments.${index}.description`}
              multiline
              rows={6}
              xs={12}
            />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
