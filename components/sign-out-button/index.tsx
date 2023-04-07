import { FC } from 'react';

import { Logout } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import useUserStore from '_/store/user/store';

const SignOutButton: FC = () => {
  const { wipeUser } = useUserStore();

  return (
    <Tooltip title="Sair" arrow>
      <IconButton
        size="large"
        color="inherit"
        onClick={wipeUser}
        aria-label="Sair"
      >
        <Logout color="disabled" />
      </IconButton>
    </Tooltip>
  );
};

export default SignOutButton;
