export enum Routes {
  Login = `/`,
  SignUp = `/sign-up`,
  Configurations = `/configurations`,
  GithubCommitsLoad = `/github/commits/load`,
}

export const routes = {
  login: (): Routes => Routes.Login,
  signUp: (): Routes => Routes.SignUp,
  configurations: (): Routes => Routes.Configurations,
  githubCommitsLoad: (): Routes => Routes.GithubCommitsLoad,

  private: [Routes.Configurations, Routes.GithubCommitsLoad],
  protected: [Routes.Login, Routes.SignUp],
  public: [] as Routes[],
};

export enum RouteTypes {
  Private = 'private',
  Protected = 'protected',
  Public = 'public',
}
