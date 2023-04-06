import { Theme } from '@mui/material';

export interface UiStoreTypes {
  theme: Theme;
  themeMode: Theme['palette']['mode'];
  switchThemeMode(): void;
}
