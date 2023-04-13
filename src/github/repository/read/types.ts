import { GithubBranchRead } from '@/github/branch/read/types';

export namespace GithubRepositoryRead {
  export interface Output {
    fullName: string;
    branch?: GithubBranchRead.Output;
  }

  export interface Query {
    getAllGithubRepositories: Output[];
  }
}
