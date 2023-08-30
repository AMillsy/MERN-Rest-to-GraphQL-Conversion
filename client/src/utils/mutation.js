import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation(
    $description: String!
    $bookId: String!
    $title: String!
    $image: String
    $link: String
    $authors: [String]
  ) {
    saveBook(
      description: $description
      bookId: $bookId
      title: $title
      image: $image
      link: $link
      authors: $authors
    ) {
      _id
      username
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
