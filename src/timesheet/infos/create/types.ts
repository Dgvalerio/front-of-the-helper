import { MutationTuple } from '@apollo/client';

import { TimesheetInfosRead } from '@/timesheet/infos/read/types';

export namespace TimesheetInfosCreate {
  export interface Input {
    login: string;
    password: string;
  }

  export type Hook = () => MutationTuple<
    { createTimesheetInfos: TimesheetInfosRead.Output },
    { data: Input }
  >;
}
