import { gql } from "apollo-angular";

export const SELECT_ALL_SONGS = gql`
  query {
    selectAll_songs {
      id
      title
      artist
      album
    }
  }
`