import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NextPage } from 'next';

import { Button, Grid, Typography } from '@mui/material';

import { Form } from '@components/form';
import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';

import { errorHandler } from '@utils/error-handler';
import { RouteTypes } from '@utils/routes';

import { gitCommitReadFormSchema } from '@/github/commit/read/schema';
import { useGithubCommitRead } from '@/github/commit/read/service';
import { GithubCommitRead } from '@/github/commit/read/types';
import { SimpleList } from '@/user/read/simple-list.view';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const GithubCommitsLoadPage: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Private);

  const [load, result] = useGithubCommitRead();

  const { disableLoad } = useUiStore();

  const gitCommitReadForm = useForm<GithubCommitRead.Input>({
    resolver: zodResolver(gitCommitReadFormSchema),
  });

  const handleSearch = async (
    data: z.infer<typeof gitCommitReadFormSchema>
  ): Promise<void> => {
    try {
      await load({
        variables: {
          options: {
            translate: data.translate,
            when: {
              since: `${data.since}T00:00:00Z`,
              until: `${data.until}T00:00:00Z`,
            },
          },
        },
      });
    } catch (e) {
      errorHandler(e);
    }
  };

  useEffect(() => disableLoad(Load.RedirectToGithubCommitsLoad), [disableLoad]);

  if (!pass) return <Loading />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1" textAlign="center">
          Carregar Commits
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormProvider {...gitCommitReadForm}>
              <Form.Container
                xs={12}
                justifyContent="space-between"
                onSubmit={handleSearch}
              >
                <Grid item xs={6}>
                  <Form.Input
                    label="Desde de"
                    name="since"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Form.Input
                    label="Até"
                    name="until"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Form.Input
                    label="Traduzir"
                    name="translate"
                    boolean
                    defaultValue={false}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type="submit" variant="outlined" fullWidth>
                    Carregar
                  </Button>
                </Grid>
              </Form.Container>
            </FormProvider>
          </Grid>
          <SimpleList result={result} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GithubCommitsLoadPage;
