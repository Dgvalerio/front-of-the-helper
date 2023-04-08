import { gql, QueryResult, useQuery } from '@apollo/client';

import { GithubRepositoryRead } from '@/github/repository/read/types';

export const githubRepositoryReadQuery = gql`
  query GithubRepositoryReadQuery {
    getAllGithubRepositories {
      fullName
      branch {
        name
      }
    }
  }
`;

export const useGithubRepositoryRead =
  (): QueryResult<GithubRepositoryRead.Query> =>
    useQuery<GithubRepositoryRead.Query>(githubRepositoryReadQuery);
