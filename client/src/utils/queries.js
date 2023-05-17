import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($_id: ID!) {
    profile(userId: $_id) {
      _id
      username
    }
  }
`;