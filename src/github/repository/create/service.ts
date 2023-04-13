import { gql, useMutation } from '@apollo/client';

import { GithubRepositoryCreate } from '@/github/repository/create/types';

export const githubRepositoryCreateMutation = gql`
  mutation CreateGithubRepository($data: GithubRepositoryCreateInput!) {
    createGithubRepository(data: $data) {
      id
      fullName
      userId
    }
  }
`;

export const useGithubRepositoryCreate: GithubRepositoryCreate.Hook = () =>
  useMutation(githubRepositoryCreateMutation);
