import { MutationTuple } from '@apollo/client';

import { GithubBranchRead } from '@/github/branch/read/types';

export namespace GithubBranchDelete {
  export interface Input {
    repository: string;
  }

  export type Hook = () => MutationTuple<
    { deleteGithubBranch: GithubBranchRead.Output },
    { data: Input }
  >;
}
