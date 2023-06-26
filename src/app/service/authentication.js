import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';

const SIGN_IN_GQL = gql`
  mutation signIn($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
        photoURL
        shortcuts {
          name
        }
        role {
          name
          type
        }
      }
    }
  }
`;

// export const REFRESH_TOKEN = gql`
//   mutation refreshToken {
//     refreshToken
//   }
// `;

export const REACCESS_TOKEN = gql`
  query reAccessBytoken {
    me {
      id
      username
      email
      photoURL
      shortcuts {
        name
      }
      role {
        name
        type
      }
    }
  }
`;

const api = {
  signIn(identifier, password) {
    const client = new ApolloClientWrapper(false).init();
    return client.mutate({
      mutation: SIGN_IN_GQL,
      variables: { input: { identifier, password } },
    });
  },
  reAccessWithToken() {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: REACCESS_TOKEN,
      variables: {},
    });
  },
};
export default api;
