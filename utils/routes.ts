export enum Routes {
  Login = `/`,
  Configurations = `/configurations`,
  GithubCommitsLoad = `/github/commits/load`,
}

export const routes = {
  login: (): Routes => Routes.Login,
  configurations: (): Routes => Routes.Configurations,
  githubCommitsLoad: (): Routes => Routes.GithubCommitsLoad,

  private: [Routes.Configurations, Routes.GithubCommitsLoad],
  protected: [Routes.Login],
  public: [] as Routes[],
};

export enum RouteTypes {
  Private = 'private',
  Protected = 'protected',
  Public = 'public',
}
