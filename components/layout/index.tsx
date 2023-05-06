import { FC, PropsWithChildren, useEffect } from 'react';

import { Grid } from '@mui/material';

import LeftBar from '@components/layout/left-bar';
import TopBar from '@components/layout/top-bar';
import Loading from '@components/loading';

import useTimesheetStore from '@store/timesheet/store';
import useUiStore from '@store/ui/store';
import useUserStore from '@store/user/store';

import { errorHandler } from '@utils/error-handler';

import { useGetAllTimesheetClients } from '@/timesheet/client/read/service';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { loading } = useUiStore();
  const { user, wipeUser } = useUserStore();
  const { clients, setClients } = useTimesheetStore();

  const [loadClients, result] = useGetAllTimesheetClients();

  useEffect(() => {
    if (!clients || clients.length === 0) void loadClients();
  }, [clients, loadClients]);

  useEffect(() => {
    if (result.data) setClients(result.data.getAllTimesheetClient);
  }, [result, setClients]);

  useEffect(() => {
    const message = errorHandler(result.error);

    if (message === 'Unauthorized') wipeUser();
  }, [result.error, wipeUser]);

  return (
    <>
      <TopBar />
      <Grid
        container
        justifyContent="center"
        alignItems={user ? 'stretch' : 'center'}
        flex={1}
      >
        <LeftBar />
        <Grid item xs={9} p={2}>
          {children}
        </Grid>
      </Grid>
      {loading.length > 0 && <Loading />}
      {result.loading && (
        <Loading
          texts={[
            'Carregando clientes',
            'Carregando projetos',
            'Carregando categorias',
          ]}
        />
      )}
    </>
  );
};

export default Layout;
