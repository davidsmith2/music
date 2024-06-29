import { gql } from "apollo-angular";

export const SELECT_ALL_ALBUMS = gql`
  query selectAll_albums {
    selectAll_albums {
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
`;

export const SELECT_ONE_ALBUM = gql`
  query selectOne_album($id: String!) {
    selectOne_album(id: $id) {
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
`;

export const UPDATE_ONE_ALBUM = gql`
  mutation updateOne_album($album: AlbumUpdateType!) {
    updateOne_album(album: $album) {
      id
      cover
    }
  }
`;
