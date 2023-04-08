import { FC } from 'react';

import { useRouter } from 'next/router';

import {
  Commit as CommitIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { IconButton, SvgIconTypeMap, Tooltip } from '@mui/material';
import { OverridableComponent } from '@mui/types';

import styled from '@emotion/styled';

import Bar from '@components/layout/bar';
import SignOutButton from '@components/sign-out-button';

import useUiStore from '@store/ui/store';
import { Load } from '@store/ui/types';
import useUserStore from '@store/user/store';

import { Routes } from '@utils/routes';

const Container = styled(Bar)`
  flex-direction: column;

  hr {
    width: 40%;
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const redirectLoad = (goTo: Routes): Load => {
  switch (goTo) {
    case Routes.Login:
      return Load.RedirectToLogin;
    case Routes.Configurations:
      return Load.RedirectToConfigurations;
    case Routes.GithubCommitsLoad:
      return Load.RedirectToGithubCommitsLoad;
  }
};

const GoTo: FC<{
  route: Routes;
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
}> = ({ route, name, Icon }) => {
  const router = useRouter();

  const { enableLoad } = useUiStore();

  const handler = (): void => {
    if (router.route === route) return;

    enableLoad(redirectLoad(route));
    void router.push(route);
  };

  return (
    <Tooltip title={`Ir para ${name}`} arrow placement="right">
      <IconButton
        size="large"
        color="inherit"
        onClick={handler}
        aria-label={`Ir para ${name}`}
      >
        <Icon color="disabled" />
      </IconButton>
    </Tooltip>
  );
};

const LeftBar: FC = () => {
  const { user } = useUserStore();

  if (!user) {
    return <Container />;
  }

  return (
    <Container>
      <GoTo
        name="Configurações"
        route={Routes.Configurations}
        Icon={SettingsIcon}
      />
      <GoTo
        name="Carregar Commits"
        route={Routes.GithubCommitsLoad}
        Icon={CommitIcon}
      />
      <hr />
      <SignOutButton />
    </Container>
  );
};

export default LeftBar;
