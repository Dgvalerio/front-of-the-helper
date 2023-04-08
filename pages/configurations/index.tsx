import { useEffect } from 'react';
import * as React from 'react';

import { NextPage } from 'next';

import { Typography } from '@mui/material';

import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';

import { RouteTypes } from '@utils/routes';

import { RepositoryConfigurations } from '@/github/repository/configurations.view';

const ConfigurationsPage: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Private);

  const { disableLoad } = useUiStore();

  useEffect(() => disableLoad(Load.RedirectToConfigurations), [disableLoad]);

  if (!pass) return <Loading />;

  return (
    <>
      <Typography variant="h3" component="h1" textAlign="center" mb={4}>
        Configurações
      </Typography>
      <RepositoryConfigurations />
    </>
  );
};

export default ConfigurationsPage;
