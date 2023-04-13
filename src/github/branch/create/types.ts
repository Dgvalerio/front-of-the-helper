import { MutationTuple } from '@apollo/client';

import { GithubBranchRead } from '@/github/branch/read/types';

export namespace GithubBranchCreate {
  export interface Input {
    repository: string;
    branch: string;
  }

  export type Hook = () => MutationTuple<
    { setGithubBranch: GithubBranchRead.Output },
    { data: Input }
  >;
}
