import { FC, PropsWithChildren } from 'react';

import { Box } from '@mui/material';

import styled from '@emotion/styled';

import Bar from '@components/layout/bar';
import LeftBar from '@components/layout/left-bar';
import Loading from '@components/loading';
import ThemeModeSwitcher from '@components/theme-mode-switcher';

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

const TopBar = styled(Bar)``;

const RightBar = styled(Bar)`
  flex-direction: column;
  height: 100vh;
  position: fixed;
  right: 0;
`;

const BottomBar = styled(Bar)``;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { loading } = useUiStore();

  return (
    <>
      <Container>
        <LeftBar />
        <main>
          <TopBar />
          {children}
          <BottomBar />
        </main>
        <RightBar>
          <ThemeModeSwitcher />
        </RightBar>
      </Container>

      {loading.length > 0 && <Loading />}
    </>
  );
};

export default Layout;
