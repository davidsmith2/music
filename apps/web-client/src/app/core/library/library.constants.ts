import { gql } from 'apollo-angular';

export const GET_LIBRARY_SUMMARY = gql`
  query librarySummary($username: ID!) {
    getLibrarySummary(username: $username) {
      username
      songs
      albums
      artists
    }
  }
`;
