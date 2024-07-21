import { gql } from "apollo-angular";

export const GET_SONGS = gql`
  query songs {
    getSongs {
      _id
      title
      artist
      album
    }
  }
`