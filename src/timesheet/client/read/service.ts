import { gql, LazyQueryResultTuple, useLazyQuery } from '@apollo/client';

import { TimesheetClientRead } from '@/timesheet/client/read/types';

export const getAllTimesheetClientsQuery = gql`
  query GetAllTimesheetClient {
    getAllTimesheetClient {
      id
      title
      projects {
        id
        name
        startDate
        endDate
        categories {
          id
          name
        }
      }
    }
  }
`;

export const useGetAllTimesheetClients = (): LazyQueryResultTuple<
  TimesheetClientRead.Query,
  TimesheetClientRead.Options
> =>
  useLazyQuery<TimesheetClientRead.Query, TimesheetClientRead.Options>(
    getAllTimesheetClientsQuery
  );
