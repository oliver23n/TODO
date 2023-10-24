import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($title: String!, $description: String){
    addTask(title: $title, description: $description){
      title
      description
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($Id: ID!, $status: String){
    updateTask(_id: $Id, status: $status){
      title
      description
    }
  }
`;

export const DELETE_TASK = gql`
  mutation removeTask($Id: ID!){
    removeTask(_id: $Id){
      title
    }
  }
`;