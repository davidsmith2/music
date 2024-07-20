import { gql } from "apollo-angular";

export const SELECT_ALL_ALBUMS = gql`
  query selectAll_albums {
    selectAll_albums {
      _id
      title
      artist
      cover
    }
  }
`;

export const SELECT_ONE_ALBUM = gql`
  query selectOne_album($_id: String!) {
    selectOne_album(_id: $_id) {
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

export const UPDATE_ONE_ALBUM = gql`
  mutation updateOne_album($album: AlbumUpdate!) {
    updateOne_album(album: $album) {
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
