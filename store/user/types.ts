import { UserAuth } from '@/user/auth/types';
import { UserRead } from '@/user/read/types';

export interface UserStoreTypes {
  user?: UserRead.Output;
  token?: string;

  setUser(data: UserAuth.Output): void;
  wipeUser(): void;
}
