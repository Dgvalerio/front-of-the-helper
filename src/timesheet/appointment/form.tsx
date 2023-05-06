import { FC, useMemo } from 'react';
import * as React from 'react';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import { Form } from '@components/form';

import useTimesheetStore from '@store/timesheet/store';

import { AppointmentSchema } from '@/timesheet/appointment/types';

import { transparentize } from 'polished';

interface AppointmentFormProps {
  field: FieldArrayWithId<AppointmentSchema, 'appointments'>;
  index: number;
  add(position: number, value: AppointmentSchema['appointments']): void;
}

export const AppointmentForm: FC<AppointmentFormProps> = ({
  field,
  index,
  add,
}) => {
  const { palette } = useTheme();

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AppointmentSchema>();

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

  const handleAdd = (): void => {
    add(index + 1, [
      {
        client: { label: '', value: '' },
        project: { label: '', value: '' },
        category: { label: '', value: '' },
        date: field.date,
        start: '00:00',
        end: '00:01',
        description: '',
      },
    ]);
  };

  return (
    <>
      <Grid item xs={12} key={field.id}>
        <Card>
          <CardContent
            style={{
              backgroundColor: transparentize(
                errors.appointments &&
                  errors.appointments[index] &&
                  errors.appointments[index]?.message
                  ? 0.6
                  : 1,
                palette.error.dark
              ),
            }}
          >
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
                label="Categoria"
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
                InputLabelProps={{ shrink: true }}
                xs={4}
              />
              <Form.Input
                label="Horário inicial"
                name={`appointments.${index}.start`}
                type="time"
                size="small"
                InputLabelProps={{ shrink: true }}
                xs={4}
              />
              <Form.Input
                label="Horário final"
                name={`appointments.${index}.end`}
                type="time"
                size="small"
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
              {errors.appointments && errors.appointments[index] && (
                <Grid item xs={12}>
                  <Typography variant="overline">
                    {errors.appointments[index]?.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Button size="small" onClick={handleAdd}>
            Adicionar outro apontamento
          </Button>
        </Divider>
      </Grid>
    </>
  );
};
