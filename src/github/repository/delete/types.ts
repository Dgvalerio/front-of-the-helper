import { MutationTuple } from '@apollo/client';

import { GithubRepositoryRead } from '@/github/repository/read/types';

export namespace GithubRepositoryDelete {
  export interface Input {
    fullName: string;
  }

  export type Hook = () => MutationTuple<
    { deleteGithubRepository: GithubRepositoryRead.Output },
    { data: Input }
  >;
}
