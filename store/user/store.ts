import { UserStoreTypes } from '@store/user/types';

import { UserRead } from '@/user/read/types';

import { create } from 'zustand';

const useUserStore = create<UserStoreTypes>((set) => ({
  setUser(user: UserRead.Output): void {
    set({ user });
  },

  wipeUser(): void {
    set({ user: undefined });
  },
}));

export default useUserStore;
