import { MutationTuple } from '@apollo/client';

import { GithubRepositoryRead } from '@/github/repository/read/types';

export namespace GithubRepositoryCreate {
  export interface Input {
    fullName: string;
  }

  export type Hook = () => MutationTuple<
    { createGithubRepository: GithubRepositoryRead.Output },
    { data: Input }
  >;
}
