import { FC, useEffect } from 'react';

import { QueryResult } from '@apollo/client';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { GithubCommitRead } from '@/github/commit/read/types';

export const SimpleList: FC<{
  result: QueryResult<GithubCommitRead.Query, GithubCommitRead.Options>;
}> = ({ result: { data, loading, error } }) => {
  const { wipeUser } = useUserStore();

  useEffect(() => {
    const message = errorHandler(error);

    if (message === 'Unauthorized') wipeUser();
  }, [error, wipeUser]);

  return loading ? (
    <Grid item xs={12}>
      <Typography>Loading</Typography>
    </Grid>
  ) : (
    <>
      <Grid item xs={12}>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Commits</Typography>
      </Grid>
      {data?.loadGithubCommits.map((commit) => (
        <Grid item xs={4} key={commit.date}>
          <Card
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent style={{ flex: 1 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {new Date(commit.date).toLocaleString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </Typography>
              <Typography variant="body1" flex={1} my={1}>
                {commit.description}
              </Typography>
            </CardContent>
            <CardActions
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button size="small">Ver commit</Button>
              <Typography color="text.secondary" textAlign="right" paddingX={2}>
                {commit.repo}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};
