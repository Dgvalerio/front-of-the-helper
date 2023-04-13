import { gql, QueryResult, useQuery } from '@apollo/client';

import { GithubInfosRead } from '@/github/infos/read/types';

export const githubInfosReadQuery = gql`
  query GithubInfosReadQuery {
    getOneGithubInfos {
      id
      token
      userId
    }
  }
`;

export const useGithubInfosRead = (): QueryResult<GithubInfosRead.Query> =>
  useQuery<GithubInfosRead.Query>(githubInfosReadQuery);
