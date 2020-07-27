import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      name
      jwt
    }
  }
`;