import { MutationTuple } from '@apollo/client';

import { GithubInfosRead } from '@/github/infos/read/types';

export namespace GithubInfosUpdate {
  export interface Input {
    token: string;
  }

  export type Hook = () => MutationTuple<
    { updateGithubInfos: GithubInfosRead.Output },
    { data: Input }
  >;
}
