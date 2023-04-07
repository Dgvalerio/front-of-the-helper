import { FC, PropsWithChildren } from 'react';

import { Box } from '@mui/material';

import styled from '@emotion/styled';

import Loading from '@components/loading';
import SignOutButton from '@components/sign-out-button';
import ThemeModeSwitcher from '@components/theme-mode-switcher';

import useUiStore from '@store/ui/store';
import useUserStore from '@store/user/store';

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
  }
`;

const Bar = styled(Box)`
  display: flex;

  min-height: 4rem;
  min-width: 4rem;

  justify-content: center;
  align-items: center;
`;

const TopBar = styled(Bar)``;

const LeftBar = styled(Bar)`
  flex-direction: column;

  hr {
    width: 40%;
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const RightBar = styled(Bar)`
  flex-direction: column;
`;

const BottomBar = styled(Bar)``;

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUserStore();
  const { loading } = useUiStore();

  return (
    <>
      <TopBar />
      <Container>
        <LeftBar>
          {user && (
            <>
              <ThemeModeSwitcher />
              <hr />
              <SignOutButton />
            </>
          )}
        </LeftBar>
        <main>{children}</main>
        <RightBar>
          <ThemeModeSwitcher />
        </RightBar>
      </Container>
      <BottomBar />
      {loading.length > 0 && <Loading />}
    </>
  );
};

export default Layout;
