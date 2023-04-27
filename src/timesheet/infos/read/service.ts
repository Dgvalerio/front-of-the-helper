import { gql, QueryResult, useQuery } from '@apollo/client';

import { TimesheetInfosRead } from '@/timesheet/infos/read/types';

export const getOneTimesheetInfosQuery = gql`
  query GetOneTimesheetInfos {
    getOneTimesheetInfos {
      id
      login
      iv
      content
      userId
    }
  }
`;

export const useGetOneTimesheetInfos =
  (): QueryResult<TimesheetInfosRead.Query> =>
    useQuery<TimesheetInfosRead.Query>(getOneTimesheetInfosQuery);
