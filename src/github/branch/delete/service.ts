import { gql, useMutation } from '@apollo/client';

import { GithubBranchDelete } from '@/github/branch/delete/types';

export const githubBranchDeleteMutation = gql`
  mutation DeleteGithubBranch($data: GithubBranchDeleteInput!) {
    deleteGithubBranch(data: $data)
  }
`;

export const useGithubBranchDelete: GithubBranchDelete.Hook = () =>
  useMutation(githubBranchDeleteMutation);
