export namespace GithubRepositoryLoad {
  export interface Output {
    fullName: string;
    name: string;
    ownerLogin: string;
    ownerAvatar: string;
  }

  export interface Query {
    loadGithubRepositories: Output[];
  }
}
