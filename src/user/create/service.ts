import { gql, useMutation } from '@apollo/client';

import { UserCreate } from '@/user/create/types';

export const userCreateMutation = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
      name
    }
  }
`;

export const useUserCreate: UserCreate.Hook = () =>
  useMutation(userCreateMutation);
