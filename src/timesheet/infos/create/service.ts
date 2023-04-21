import { gql, useMutation } from '@apollo/client';

import { TimesheetInfosCreate } from '@/timesheet/infos/create/types';

export const timesheetInfosCreateMutation = gql`
  mutation TimesheetInfosCreate($data: TimesheetInfosCreateInput!) {
    createTimesheetInfos(data: $data) {
      id
      login
      iv
      content
      userId
    }
  }
`;

export const useTimesheetInfosCreate: TimesheetInfosCreate.Hook = () =>
  useMutation(timesheetInfosCreateMutation);
