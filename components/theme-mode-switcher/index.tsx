import { FC } from 'react';

import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

import useUiStore from '@store/ui/store';

const ThemeModeSwitcher: FC = () => {
  const { themeMode, switchThemeMode } = useUiStore();

  return (
    <IconButton size="large" color="inherit" onClick={switchThemeMode}>
      {themeMode === 'dark' ? (
        <LightModeIcon color="disabled" />
      ) : (
        <DarkModeIcon color="disabled" />
      )}
    </IconButton>
  );
};

export default ThemeModeSwitcher;
