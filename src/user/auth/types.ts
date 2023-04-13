import { MutationTuple } from '@apollo/client';

import { UserRead } from '@/user/read/types';

export namespace UserAuth {
  export interface Input {
    email: string;
    password: string;
  }

  export interface Output {
    user: UserRead.Output;
    token: string;
  }

  export type Hook = () => MutationTuple<{ login: Output }, { data: Input }>;
}
