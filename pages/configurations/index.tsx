import { useEffect } from 'react';

import { NextPage } from 'next';

import { Typography } from '@mui/material';

import useUiStore from '_/store/ui/store';
import { Load } from '_/store/ui/types';

const ConfigurationsPage: NextPage = () => {
  const { disableLoad } = useUiStore();

  useEffect(() => disableLoad(Load.RedirectToConfigurations), [disableLoad]);

  return (
    <Typography variant="h2" component="h1">
      Configurations Page
    </Typography>
  );
};

export default ConfigurationsPage;
