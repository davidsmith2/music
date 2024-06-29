import { gql } from "apollo-angular";

export const SELECT_ONE_LIBRARY = gql`
  query selectOne_library($id: String!) {
    selectOne_library(id: $id) {
      id
      artists {
        id
        name
      }
    }
  }
`;