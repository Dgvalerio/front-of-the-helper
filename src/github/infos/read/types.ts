export namespace GithubInfosRead {
  export interface Output {
    id: string;
    token: string;
    userId: string;
  }

  export interface Query {
    getOneGithubInfos: Output;
  }
}
