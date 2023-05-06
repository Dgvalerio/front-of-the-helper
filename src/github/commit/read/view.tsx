import { FC, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { LazyQueryExecFunction } from '@apollo/client';

import { Remove as RemoveIcon } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';

import { Form } from '@components/form';

import useTimesheetStore from '@store/timesheet/store';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { gitCommitReadFormSchema } from '@/github/commit/read/schema';
import { CommitsSearchContainer } from '@/github/commit/read/styles';
import { GithubCommitRead } from '@/github/commit/read/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

interface CommitsSearchProps {
  load: LazyQueryExecFunction<
    GithubCommitRead.QueryGrouped,
    GithubCommitRead.Options
  >;
}

export const CommitsSearch: FC<CommitsSearchProps> = ({ load }) => {
  const { wipeUser } = useUserStore();
  const { dayTimes, setDayTimes } = useTimesheetStore();

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

  const handleSearch = async (
    data: z.infer<typeof gitCommitReadFormSchema>
  ): Promise<void> => {
    try {
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

  return (
    <CommitsSearchContainer>
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
    </CommitsSearchContainer>
  );
};
