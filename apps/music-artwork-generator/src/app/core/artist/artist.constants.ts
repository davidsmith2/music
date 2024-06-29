import { gql } from "apollo-angular";

export const SELECT_ONE_ARTIST = gql`
  query {
    selectOne_artist(id: "b15ad6e5") {
        id
        name
        albums {
          id
          title
          artist
          cover
          songs {
              id
              title
          }
        }
    }
  }
`;