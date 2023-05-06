import { useEffect } from 'react';
import * as React from 'react';

import { NextPage } from 'next';

import { Box } from '@mui/material';

import styled from '@emotion/styled';

import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';

import { RouteTypes } from '@utils/routes';

import { useGithubCommitReadGrouped } from '@/github/commit/read/service';
import { CommitsSearch } from '@/github/commit/read/view';
import { GroupedList } from '@/timesheet/appointment/view';

const Container = styled(Box)`
  display: flex;
  gap: 1rem;
`;

const GithubCommitsLoadPage: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Private);

  const { disableLoad } = useUiStore();

  const [load, result] = useGithubCommitReadGrouped();

  useEffect(() => disableLoad(Load.RedirectToGithubCommitsLoad), [disableLoad]);

  if (!pass) return <Loading />;

  return (
    <Container>
      <CommitsSearch load={load} />
      <GroupedList result={result} />
    </Container>
  );
};

export default GithubCommitsLoadPage;
