import { toast } from 'react-toastify';

import { ApolloError } from '@apollo/client';

export const errorHandler = (e: unknown): string | void => {
  const error = e as ApolloError;

  if (error) {
    if (error.graphQLErrors.length > 0) {
      error.graphQLErrors.map(({ message }) => toast.error(message));

      return error.graphQLErrors[0].message;
    } else {
      toast.error(error.message);

      return error.message;
    }
  }
};
