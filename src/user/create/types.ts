import { MutationTuple } from '@apollo/client';

import { UserRead } from '@/user/read/types';

export namespace UserCreate {
  export interface Input {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  export interface Output {
    createUser: UserRead.Output;
  }

  export type Hook = () => MutationTuple<Output, { data: Input }>;
}
