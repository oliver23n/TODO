import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_TASKS = gql`
  query tasks{
    tasks{
      title
      description
      status
    }
  }
`;