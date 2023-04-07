export namespace UserRead {
  export interface Output {
    id: string;
    name: string;
    email: string;
    password: string;
    resetPasswordToken: string | null;
    // githubInfos?: GithubInfosRead.Output;
    // timesheetInfos?: TimesheetInfosRead.Output;
    // githubRepositories: GithubRepositoryRead.Output[];
  }
}
