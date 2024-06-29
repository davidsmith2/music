import { gql } from "apollo-angular";

export const SELECT_ONE_LIBRARY = gql`
  query {
    selectOne_library(id: "951a9862") {
      id
      artists {
        id
        name
      }
    }
  }
`;