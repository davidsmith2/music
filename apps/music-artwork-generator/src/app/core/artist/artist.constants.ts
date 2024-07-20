import { gql } from "apollo-angular";

export const SELECT_ALL_ARTISTS = gql`
  query {
    selectAll_artists {
      _id
      name
    }
  }
`;

export const SELECT_ONE_ARTIST = gql`
  query selectOne_artist($id: String!) {
    selectOne_artist(id: $id) {
      _id
      name
      albums {
        _id
        title
        artist
        cover
        genre @client
        year @client
        songs {
          _id
          title
          genre
          year
          duration
          durationInMinutes @client
        }
        totalSongs @client
        totalDurationInMinutes @client
      }
      totalAlbums @client
      totalSongs @client
    }
  }
`;