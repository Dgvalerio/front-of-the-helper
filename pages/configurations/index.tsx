import { useEffect } from 'react';

import { NextPage } from 'next';

import { Typography } from '@mui/material';

import Loading from '@components/loading';

import useAuthVerify from '@hooks/use-auth-verify';

import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';

import { RouteTypes } from '@utils/routes';

const ConfigurationsPage: NextPage = () => {
  const pass = useAuthVerify(RouteTypes.Private);

  const { disableLoad } = useUiStore();

  useEffect(() => disableLoad(Load.RedirectToConfigurations), [disableLoad]);

  if (!pass) return <Loading />;

  return (
    <Typography variant="h2" component="h1">
      Configurations Page
    </Typography>
  );
};

export default ConfigurationsPage;
