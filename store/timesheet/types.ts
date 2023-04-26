import { GithubCommitRead } from '@/github/commit/read/types';

export interface TimesheetStoreTypes {
  dayTimes: GithubCommitRead.DayTime[];
  setDayTimes(dayTimes: GithubCommitRead.DayTime[]): void;
}
