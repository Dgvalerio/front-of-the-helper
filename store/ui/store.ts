import { darkTheme, lightTheme } from '@/components/style-wrapper/global.theme';
import { UiStoreTypes } from '@/store/ui/types';

import { create } from 'zustand';

const useUiStore = create<UiStoreTypes>((set) => ({
  theme: darkTheme,

  switchThemeMode(): void {
    set((previous) => ({
      theme: previous.theme.palette.mode === 'light' ? darkTheme : lightTheme,
    }));
  },
}));

export default useUiStore;
