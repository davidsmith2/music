import { gql } from "apollo-angular";

export const SELECT_ONE_ARTIST = gql`
  query selectOne_artist($id: String!) {
    selectOne_artist(id: $id) {
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
        totalSongs @client
      }
      totalAlbums @client
      totalSongs @client
    }
  }
`;