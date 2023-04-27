import { GithubCommitRead } from '@/github/commit/read/types';
import { TimesheetClientRead } from '@/timesheet/client/read/types';

export interface TimesheetStoreTypes {
  dayTimes: GithubCommitRead.DayTime[];
  setDayTimes(dayTimes: GithubCommitRead.DayTime[]): void;
  clients: TimesheetClientRead.Client[];
  setClients(clients: TimesheetClientRead.Client[]): void;
}
