export enum Routes {
  Login = `/`,
  Configurations = `/configurations`,
}

export const routes = {
  login: (): Routes => Routes.Login,
  configurations: (): Routes => Routes.Configurations,

  private: [Routes.Configurations],
  protected: [Routes.Login],
  public: [] as Routes[],
};

export enum RouteTypes {
  Private = 'private',
  Protected = 'protected',
  Public = 'public',
}
