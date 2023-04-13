import { gql, QueryResult, useQuery } from '@apollo/client';

import { GithubRepositoryLoad } from '@/github/repository/load/types';

export const githubRepositoryLoadQuery = gql`
  query GithubRepositoryLoadQuery {
    loadGithubRepositories {
      fullName
      name
      ownerLogin
      ownerAvatar
    }
  }
`;

export const useGithubRepositoryLoad =
  (): QueryResult<GithubRepositoryLoad.Query> =>
    useQuery<GithubRepositoryLoad.Query>(githubRepositoryLoadQuery);
