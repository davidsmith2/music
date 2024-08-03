import { gql } from 'apollo-angular';

export const GET_ALBUMS = gql`
  query albums {
    getAlbums {
      _id
      title
      artist
      cover
    }
  }
`;

export const GET_ALBUM = gql`
  query album($_id: ID!) {
    getAlbum(_id: $_id) {
      _id
      title
      artist
      cover
      songs {
        _id
        title
      }
    }
  }
`;

export const UPDATE_ALBUM = gql`
  mutation updateAlbum($album: AlbumUpdate!) {
    updateAlbum(album: $album) {
      _id
      title
      artist
      cover
    }
  }
`;

export const ALBUM_UPDATED_SUBSCRIPTION = gql`
  subscription albumUpdated($artistName: String!) {
    albumUpdated(artistName: $artistName) {
      title
      artist
      cover
    }
  }
`;
