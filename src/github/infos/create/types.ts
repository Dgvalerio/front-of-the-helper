import { MutationTuple } from '@apollo/client';

import { GithubInfosRead } from '@/github/infos/read/types';

export namespace GithubInfosCreate {
  export interface Input {
    token: string;
  }

  export type Hook = () => MutationTuple<
    { createGithubInfos: GithubInfosRead.Output },
    { data: Input }
  >;
}
