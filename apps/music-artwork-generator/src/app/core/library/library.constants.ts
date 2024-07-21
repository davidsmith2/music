import { gql } from "apollo-angular";

export const SELECT_ONE_LIBRARY_SUMMARY = gql`
  query selectOne_librarySummary($username: String!) {
    selectOne_librarySummary(username: $username) {
      username
      songs
      albums
      artists
    }
  }
`;