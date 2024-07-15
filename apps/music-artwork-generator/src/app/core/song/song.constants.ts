import { gql } from "apollo-angular";

export const SELECT_ALL_SONGS = gql`
  query selectAll_songs {
    selectAll_songs {
      id
      title
    }
  }
`