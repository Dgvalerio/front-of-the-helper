import { gql, LazyQueryResultTuple, useLazyQuery } from '@apollo/client';

import { GithubBranchLoad } from '@/github/branch/load/types';

export const githubBranchLoadQuery = gql`
  query GithubBranchLoadQuery($data: GithubBranchGetLoadInput!) {
    loadGithubBranches(data: $data) {
      name
      sha
    }
  }
`;

export const useGithubBranchLoad = (): LazyQueryResultTuple<
  GithubBranchLoad.Query,
  GithubBranchLoad.Options
> =>
  useLazyQuery<GithubBranchLoad.Query, GithubBranchLoad.Options>(
    githubBranchLoadQuery,
    { fetchPolicy: 'network-only' }
  );
