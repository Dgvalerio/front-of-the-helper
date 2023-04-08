import { FC, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import { toast } from 'react-toastify';

import { ApolloError } from '@apollo/client';

import { Sync as SyncIcon } from '@mui/icons-material';
import {
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';

import { errorHandler } from '@utils/error-handler';

import { useGithubInfosCreate } from '@/github/infos/create/service';
import { useGithubInfosRead } from '@/github/infos/read/service';
import { useGithubInfosUpdate } from '@/github/infos/update/service';

export const InfosConfigurations: FC = () => {
  const { data, loading: getLoading, error, refetch } = useGithubInfosRead();

  const [token, setToken] = useState<string>(
    `${data?.getOneGithubInfos.token}`
  );

  const [createInfos, { loading: createLoading }] = useGithubInfosCreate();
  const [updateInfos, { loading: updateLoading }] = useGithubInfosUpdate();

  const loading = useMemo(
    () => getLoading || createLoading || updateLoading,
    [getLoading, createLoading, updateLoading]
  );

  const handleChangeToken: StandardInputProps['onChange'] = (event) => {
    setToken(event.target.value);
    void refetch();
  };

  const handleSave = async (): Promise<void> => {
    try {
      if (data) {
        await updateInfos({ variables: { data: { token } } });
      } else {
        await createInfos({ variables: { data: { token } } });
      }

      toast.success('Token salvo com sucesso!');
    } catch (e) {
      const error = e as ApolloError;

      toast.error(error.message || `Falha ao salvar token: ${error}`);
    }
  };

  useEffect(() => errorHandler(error), [error]);

  return (
    <Grid container spacing={1} px={8}>
      <Grid
        item
        xs={3}
        style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}
        paddingRight={2}
      >
        <Typography variant="h5" component="h2" textAlign="right">
          Github Token
        </Typography>
      </Grid>
      <Grid item xs={9} container spacing={1}>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={11}>
            {loading ? (
              <Skeleton width="100%" height={40} sx={{ transform: 'none' }} />
            ) : (
              <TextField
                label="Token"
                size="small"
                onChange={handleChangeToken}
                value={token}
                fullWidth
              />
            )}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                paddingTop: 7,
                paddingBottom: 7,
              }}
              aria-label="Salvar token"
              onClick={handleSave}
            >
              <SyncIcon color="disabled" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
