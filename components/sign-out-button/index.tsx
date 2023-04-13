import { FC } from 'react';

import { Logout } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import useUserStore from '@store/user/store';

const SignOutButton: FC = () => {
  const { wipeUser } = useUserStore();

  return (
    <Tooltip title="Sair" arrow placement="right">
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
