import { FC, PropsWithChildren } from 'react';

import { Grid } from '@mui/material';

import LeftBar from '@components/layout/left-bar';
import TopBar from '@components/layout/top-bar';
import Loading from '@components/loading';

import useUiStore from '@store/ui/store';
import useUserStore from '@store/user/store';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { loading } = useUiStore();
  const { user } = useUserStore();

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
    </>
  );
};

export default Layout;
