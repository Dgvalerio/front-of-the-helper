import { FC } from 'react';

import Link from 'next/link';

import { Grid, Typography } from '@mui/material';

import styled from '@emotion/styled';

import SignOutButton from '@components/sign-out-button';
import ThemeModeSwitcher from '@components/theme-mode-switcher';

import useUserStore from '@store/user/store';

import { routes } from '@utils/routes';

import { transparentize } from 'polished';

const Container = styled(Grid)`
  z-index: 1299;
  box-shadow: 0 0 2px
    ${({ theme }): string =>
      theme.palette.mode === 'light'
        ? '#c8cbd9'
        : transparentize(0.8, '#c8cbd9')};

  #brand,
  #brand-inactive {
    display: flex;

    a {
      padding-left: 0.775rem;
      display: flex;
      align-items: center;
      flex: 1;
      color: ${({ theme }): string => theme.palette.text.secondary};
      text-decoration: none;
    }
  }

  #brand {
    background-color: ${({ theme }): string =>
      theme.palette.mode === 'light'
        ? '#f1f2f7'
        : transparentize(0.98, '#f1f2f7')};
  }
`;

const TopBar: FC = () => {
  const { user } = useUserStore();

  return (
    <Container container justifyContent="space-between">
      <Grid item xs={3} id={user ? 'brand' : 'brand-inactive'}>
        <Link href={user ? routes.configurations() : routes.login()} passHref>
          <Typography variant="h6" component="a">
            Timesheet
          </Typography>
        </Link>
      </Grid>
      <Grid item px={1}>
        <ThemeModeSwitcher />
        <SignOutButton />
      </Grid>
    </Container>
  );
};

export default TopBar;
