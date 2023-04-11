import { gql, LazyQueryResultTuple, useLazyQuery } from '@apollo/client';

import { GithubCommitRead } from '@/github/commit/read/types';

export const githubCommitReadQuery = gql`
  query LoadGithubCommits($options: GithubCommitReadInput!) {
    loadGithubCommits(options: $options) {
      date
      commit
      repo
      description
    }
  }
`;

export const githubCommitReadGroupedQuery = gql`
  query LoadAndGroupGithubCommits($options: GithubCommitReadInput!) {
    loadAndGroupGithubCommits(options: $options) {
      date
      commits {
        startTime
        endTime
        items {
          repo
          commits {
            description
            commit
          }
        }
      }
    }
  }
`;

export const useGithubCommitRead = (): LazyQueryResultTuple<
  GithubCommitRead.Query,
  GithubCommitRead.Options
> =>
  useLazyQuery<GithubCommitRead.Query, GithubCommitRead.Options>(
    githubCommitReadQuery
  );

export const useGithubCommitReadGrouped = (): LazyQueryResultTuple<
  GithubCommitRead.QueryGrouped,
  GithubCommitRead.Options
> =>
  useLazyQuery<GithubCommitRead.QueryGrouped, GithubCommitRead.Options>(
    githubCommitReadGroupedQuery
  );
