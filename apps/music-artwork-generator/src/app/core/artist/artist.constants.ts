import { gql } from "apollo-angular";

export const GET_ARTISTS = gql`
  query artists {
    getArtists {
      _id
      name
    }
  }
`;

export const GET_ARTIST = gql`
  query artist($_id: ID!) {
    getArtist(_id: $_id) {
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