import { gql, useMutation } from '@apollo/client';

import { GithubBranchCreate } from '@/github/branch/create/types';

export const githubBranchCreateMutation = gql`
  mutation CreateGithubBranch($data: GithubBranchSetInput!) {
    setGithubBranch(data: $data) {
      id
      name
      sha
      repositoryId
    }
  }
`;

export const useGithubBranchCreate: GithubBranchCreate.Hook = () =>
  useMutation(githubBranchCreateMutation);
