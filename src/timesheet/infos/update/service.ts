import { gql, useMutation } from '@apollo/client';

import { TimesheetInfosUpdate } from '@/timesheet/infos/update/types';

export const timesheetInfosUpdateMutation = gql`
  mutation TimesheetInfosUpdate($data: TimesheetInfosUpdateInput!) {
    updateTimesheetInfos(data: $data) {
      id
      login
      iv
      content
      userId
    }
  }
`;

export const useTimesheetInfosUpdate: TimesheetInfosUpdate.Hook = () =>
  useMutation(timesheetInfosUpdateMutation);
