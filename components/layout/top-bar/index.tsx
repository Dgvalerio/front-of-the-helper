import { FC } from 'react';

import Link from 'next/link';

import { Grid, Typography } from '@mui/material';

import styled from '@emotion/styled';

import ThemeModeSwitcher from '@components/theme-mode-switcher';

import { routes } from '@utils/routes';

import { transparentize } from 'polished';

const Container = styled(Grid)`
  z-index: 1299;
  box-shadow: 0 0 2px
    ${({ theme }): string =>
      theme.palette.mode === 'light'
        ? '#c8cbd9'
        : transparentize(0.8, '#c8cbd9')};

  #brand {
    display: flex;
    background-color: ${({ theme }): string =>
      theme.palette.mode === 'light'
        ? '#f1f2f7'
        : transparentize(0.98, '#f1f2f7')};

    a {
      padding-left: 0.775rem;
      display: flex;
      align-items: center;
      flex: 1;
      color: ${({ theme }): string => theme.palette.text.secondary};
      text-decoration: none;
    }
  }
`;

const TopBar: FC = () => (
  <Container container justifyContent="space-between">
    <Grid item xs={3} id="brand">
      <Link href={routes.configurations()} passHref>
        <Typography variant="h6" component="a">
          Timesheet
        </Typography>
      </Link>
    </Grid>
    <Grid item>
      <ThemeModeSwitcher />
    </Grid>
  </Container>
);

export default TopBar;
