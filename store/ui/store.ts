import { darkTheme, lightTheme } from '_/components/style-wrapper/global.theme';
import { UiStoreTypes } from '_/store/ui/types';

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
