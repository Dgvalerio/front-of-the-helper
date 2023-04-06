import { darkTheme, lightTheme } from '@/components/style-wrapper/global.theme';
import { UiStoreTypes } from '@/store/ui/types';

import { create } from 'zustand';

const useUiStore = create<UiStoreTypes>((set) => ({
  theme: darkTheme,
  themeMode: 'dark',

  switchThemeMode(): void {
    set((previous) =>
      previous.theme.palette.mode === 'light'
        ? { theme: darkTheme, themeMode: 'dark' }
        : { theme: lightTheme, themeMode: 'light' }
    );
  },
}));

export default useUiStore;
