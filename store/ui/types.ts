import { Theme } from '@mui/material';

export enum Load {
  Login = 'auth-user',
  RedirectToLogin = 'redirect-to-login',
  RedirectToHome = 'redirect-to-home',
}

export interface UiStoreTypes {
  theme: Theme;
  themeMode: Theme['palette']['mode'];
  switchThemeMode(): void;
  loading: Load[];
  enableLoad(load: Load): void;
  disableLoad(load: Load): void;
}
