export enum Routes {
  Login = `/`,
  SignUp = `/sign-up`,
  Configurations = `/configurations`,
  GithubCommitsLoad = `/github/commits/load`,
  TimesheetAppointmentCreate = `/timesheet/appointment/create`,
}

export const routes = {
  login: (): Routes => Routes.Login,
  signUp: (): Routes => Routes.SignUp,
  configurations: (): Routes => Routes.Configurations,
  githubCommitsLoad: (): Routes => Routes.GithubCommitsLoad,
  createAppointment: (): Routes => Routes.TimesheetAppointmentCreate,

  private: [
    Routes.Configurations,
    Routes.GithubCommitsLoad,
    Routes.TimesheetAppointmentCreate,
  ],
  protected: [Routes.Login, Routes.SignUp],
  public: [] as Routes[],
};

export enum RouteTypes {
  Private = 'private',
  Protected = 'protected',
  Public = 'public',
}
