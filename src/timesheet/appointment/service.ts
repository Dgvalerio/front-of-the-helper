import { gql, useMutation } from '@apollo/client';

import { TimesheetAppointmentCreate } from '@/timesheet/appointment/types';

export const timesheetAppointmentCreateMutation = gql`
  mutation CreateTimesheetAppointments(
    $data: TimesheetAppointmentCreateInput!
  ) {
    createTimesheetAppointments(data: $data) {
      client
      project
      category
      date
      startTime
      endTime
      notMonetize
      commitLink
      description
      errorMessage
      success
    }
  }
`;

export const useTimesheetAppointmentCreate: TimesheetAppointmentCreate.Hook =
  () => useMutation(timesheetAppointmentCreateMutation);
