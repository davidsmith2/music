import { gql } from 'apollo-angular';

export const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    getUser(username: $username) {
      username
      firstName
      lastName
    }
  }
`;
