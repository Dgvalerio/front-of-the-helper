import { UserRead } from '@/user/read/types';

export interface UserStoreTypes {
  user?: UserRead.Output;

  setUser(user: UserRead.Output): void;
  wipeUser(): void;
}
