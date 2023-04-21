import { MutationTuple } from '@apollo/client';

import { TimesheetInfosRead } from '@/timesheet/infos/read/types';

export namespace TimesheetInfosUpdate {
  export interface Input {
    login?: string;
    password?: string;
  }

  export type Hook = () => MutationTuple<
    { updateTimesheetInfos: TimesheetInfosRead.Output },
    { data: Input }
  >;
}
