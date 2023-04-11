import { OperationVariables } from '@apollo/client';

import { GithubRepositoryRead } from '@/github/repository/read/types';

export namespace GithubCommitRead {
  export interface DayTime {
    start: string;
    end: string;
  }
  export interface DateFilter {
    since?: string;
    until?: string;
  }
  export interface Input {
    translate?: boolean;
    dayTimes?: DayTime[];
    when?: DateFilter;
  }
  export interface Output {
    repo: string;
    date: string;
    description: string;
    commit: string;
  }
  export interface Query {
    loadGithubCommits: Output[];
  }
  export interface Options extends OperationVariables {
    options: Input;
  }
  export interface OutputGrouped {
    date: string;
    commits: GithubCommitTimeGroup[];
  }
  export interface GithubCommitTimeGroup {
    startTime: string;
    endTime: string;
    items: GithubCommitTimeGroupItems[];
  }
  export interface GithubCommitTimeGroupItems {
    repo: GithubRepositoryRead.Output['fullName'];
    commits: GithubCommitOfDayTimeGroup[];
  }
  export interface GithubCommitOfDayTimeGroup {
    description: string;
    commit: string;
  }
  export interface QueryGrouped {
    loadAndGroupGithubCommits: OutputGrouped[];
  }
}
