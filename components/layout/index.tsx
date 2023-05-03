import { FC, PropsWithChildren } from 'react';

import { Box } from '@mui/material';

import styled from '@emotion/styled';

import LeftBar from '@components/layout/left-bar';
import TopBar from '@components/layout/top-bar';
import Loading from '@components/loading';

import useUiStore from '@store/ui/store';

const Container = styled(Box)`
  &,
  main {
    display: flex;
    flex: 1;
  }

  flex-direction: row;

  main {
    flex-direction: column;
    padding: 2rem;
    margin: 0 4rem;
  }
`;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { loading } = useUiStore();

  return (
    <>
      <TopBar />
      <Container>
        <LeftBar />
        <main>{children}</main>
      </Container>

      {loading.length > 0 && <Loading />}
    </>
  );
};

export default Layout;
