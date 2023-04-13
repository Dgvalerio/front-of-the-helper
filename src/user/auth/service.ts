import { gql, useMutation } from '@apollo/client';

import { UserAuth } from '@/user/auth/types';

export const userAuthMutation = gql`
  mutation UserAuth($data: UserAuthInput!) {
    login(data: $data) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const useUserAuth: UserAuth.Hook = () => useMutation(userAuthMutation);
