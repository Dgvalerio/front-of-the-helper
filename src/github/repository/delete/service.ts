import { gql, useMutation } from '@apollo/client';

import { GithubRepositoryDelete } from '@/github/repository/delete/types';

export const githubRepositoryDeleteMutation = gql`
  mutation DeleteGithubRepository($data: GithubRepositoryDeleteInput!) {
    deleteGithubRepository(data: $data)
  }
`;

export const useGithubRepositoryDelete: GithubRepositoryDelete.Hook = () =>
  useMutation(githubRepositoryDeleteMutation);
