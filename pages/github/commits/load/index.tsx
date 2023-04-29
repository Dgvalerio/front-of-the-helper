import { useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NextPage } from 'next';

import { Remove as RemoveIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';

import styled from '@emotion/styled';

import { Form } from '@components/form';
import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useTimesheetStore from '@store/timesheet/store';
import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';
import { RouteTypes } from '@utils/routes';

import { gitCommitReadFormSchema } from '@/github/commit/read/schema';
import { useGithubCommitReadGrouped } from '@/github/commit/read/service';
import { GithubCommitRead } from '@/github/commit/read/types';
import { useGetAllTimesheetClients } from '@/timesheet/client/read/service';
import { GroupedList } from '@/user/read/grouped-list.view';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const Container = styled(Box)`
  &,
  .left,
  .right {
    display: flex;
  }

  gap: 1rem;

  .left {
    flex: 1;
    height: calc(100vh - 4rem);
    align-items: center;
  }

  .right {
    flex: 2;
  }

  @media (min-width: ${({ theme }): number => theme.breakpoints.values.xl}px) {
    .right {
      flex: 4;
    }
  }
`;

const GithubCommitsLoadPage: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Private);

  const [load, result] = useGithubCommitReadGrouped();
  const [handleLoadClients, { data: clients }] = useGetAllTimesheetClients();

  const { wipeUser } = useUserStore();
  const { disableLoad } = useUiStore();
  const { dayTimes, setDayTimes, setClients } = useTimesheetStore();

  const gitCommitReadForm = useForm<GithubCommitRead.Input>({
    resolver: zodResolver(gitCommitReadFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'dayTimes',
    control: gitCommitReadForm.control,
  });

  const handleAddDayTime = (): void => {
    append({ start: '', end: '' });
  };

  const loadClients = async (): Promise<void> => {
    toast.info('Carregando clientes, projetos e categorias...');

    await handleLoadClients();

    if (clients) setClients(clients.getAllTimesheetClient);

    toast.success('Clientes, projetos e categorias carregados com sucesso!');
  };

  const handleSearch = async (
    data: z.infer<typeof gitCommitReadFormSchema>
  ): Promise<void> => {
    try {
      await loadClients();
      setDayTimes(data.dayTimes);
      await load({
        variables: {
          options: {
            translate: data.translate,
            when: {
              since: `${data.since}T00:00:00Z`,
              until: `${data.until}T00:00:00Z`,
            },
            dayTimes: data.dayTimes,
          },
        },
      });
    } catch (e) {
      const message = errorHandler(e);

      if (message === 'Unauthorized') wipeUser();
    }
  };

  useEffect(() => {
    remove();
    dayTimes.forEach(({ start, end }) => append({ start, end }));
  }, [append, dayTimes, remove]);

  useEffect(() => disableLoad(Load.RedirectToGithubCommitsLoad), [disableLoad]);

  if (!pass) return <Loading />;

  return (
    <Container>
      <div className="left">
        <FormProvider {...gitCommitReadForm}>
          <Form.Container spacing={1} xs={12} onSubmit={handleSearch}>
            <Grid item xs={12} mb={2}>
              <Typography variant="h4" component="h1" textAlign="center">
                Carregar Commits
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Form.Input
                label="Desde"
                name="since"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Form.Input
                label="Até"
                name="until"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: '1rem' }}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography>Horários</Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleAddDayTime}>Adicionar</Button>
                  </Grid>
                  {fields.map((field, index) => (
                    <Grid item xs={12} container spacing={1} key={field.id}>
                      <Grid item xs={5}>
                        <Form.Input
                          label="Inicial"
                          name={`dayTimes.${index}.start`}
                          type="time"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Form.Input
                          label="Final"
                          name={`dayTimes.${index}.end`}
                          type="time"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          style={{
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: 4,
                            paddingTop: 7,
                            paddingBottom: 7,
                          }}
                          aria-label="Remover horário"
                          onClick={remove.bind(null, index)}
                        >
                          <RemoveIcon color="disabled" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Typography variant="caption" color="error">
                      {gitCommitReadForm.formState.errors.dayTimes?.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Form.Input
                label="Traduzir"
                name="translate"
                boolean
                defaultValue={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined" fullWidth>
                Carregar
              </Button>
            </Grid>
          </Form.Container>
        </FormProvider>
      </div>
      <div className="right">
        <GroupedList result={result} />
      </div>
    </Container>
  );
};

export default GithubCommitsLoadPage;
