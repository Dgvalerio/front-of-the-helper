import { OperationVariables } from '@apollo/client';

export namespace GithubBranchLoad {
  export interface Input {
    repository: string;
  }

  export interface Output {
    name: string;
    sha: string;
  }

  export interface Query {
    loadGithubBranches: Output[];
  }

  export interface Options extends OperationVariables {
    data: Input;
  }
}
