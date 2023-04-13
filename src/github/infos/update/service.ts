import { gql, useMutation } from '@apollo/client';

import { GithubInfosUpdate } from '@/github/infos/update/types';

export const githubInfosUpdateMutation = gql`
  mutation UpdateGithubInfos($data: GithubInfosUpdateInput!) {
    updateGithubInfos(data: $data) {
      id
      token
      userId
    }
  }
`;

export const useGithubInfosUpdate: GithubInfosUpdate.Hook = () =>
  useMutation(githubInfosUpdateMutation);
