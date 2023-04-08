import { gql, useMutation } from '@apollo/client';

import { GithubInfosCreate } from '@/github/infos/create/types';

export const githubInfosCreateMutation = gql`
  mutation CreateGithubInfos($data: GithubInfosCreateInput!) {
    createGithubInfos(data: $data) {
      id
      token
      userId
    }
  }
`;

export const useGithubInfosCreate: GithubInfosCreate.Hook = () =>
  useMutation(githubInfosCreateMutation);
