import { UserStoreTypes } from '@store/user/types';

import { UserAuth } from '@/user/auth/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create<UserStoreTypes>()(
  persist(
    (set) => ({
      setUser(data: UserAuth.Output): void {
        const { user, token } = data;

        set({ user, token });
      },

      wipeUser(): void {
        set({ user: undefined, token: undefined });
      },
    }),
    { name: 'the-helper:user-storage' }
  )
);

export default useUserStore;
