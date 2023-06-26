/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient, InMemoryCache, fromPromise, split, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'; 
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import messageService from 'app/service/messageService';
import { DEFAULT_API_URL, DEFAULT_WS_API_URL } from 'app/constant';

class ApolloClientWrapper {
  isAuth;

  constructor(isAuth) {
    this.isAuth = isAuth;
  }

  init() {
    const cache = new InMemoryCache();
    let httpLink = null;
    // const getNewToken = () => {
    //   console.log(`[getNewToken]----------------`);
    //   return client.mutate({ mutation: REFRESH_TOKEN }).then((response) => {
    //     // extract your accessToken from your response data and return it
    //     const { refreshToken } = response.data;
    //     localStorage.setItem('jwt_access_token', refreshToken);
    //     return refreshToken;
    //   });
    // };

    if (this.isAuth) {
      httpLink = createUploadLink({
        uri: process.env.API_URL || DEFAULT_API_URL,
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt_access_token')}` || null,
        },
      });
    } else {
      httpLink = createUploadLink({
        uri: process.env.API_URL || DEFAULT_API_URL
      });
    }

    const wsLink = new WebSocketLink({
      uri: process.env.WS_API_URL || DEFAULT_WS_API_URL,
      options: {
        reconnect: true,
        reconnectionAttempts: 3,
        connectionParams: {
          authorization: `Bearer ${localStorage.getItem('jwt_access_token')}` || null,
        },
        lazy: true,
      },
    });
    // eslint-disable-next-line consistent-return
    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      console.log(`[graphQLErrors]: ${JSON.stringify(graphQLErrors)}`);
      if (graphQLErrors) {
        // eslint-disable-next-line no-restricted-syntax
        // for (const err of graphQLErrors) {
        //   switch (err.extensions.exception.status) {
        //     case 401:
        //       return fromPromise(
        //         getNewToken().catch(() => {
        //           // Handle token refresh errors e.g clear stored tokens, redirect to login
        //           jwtService.emit('onAutoLogout', 'access_token expired');
        //         })
        //       )
        //         .filter((value) => Boolean(value))
        //         .flatMap((refreshToken) => {
        //           const oldHeaders = operation.getContext().headers;
        //           // modify the operation context with a new token
        //           operation.setContext({
        //             headers: {
        //               ...oldHeaders,
        //               authorization: `Bearer ${refreshToken}`,
        //             },
        //           });

        //           // retry the request, returning the new observable
        //           return forward(operation);
        //         });
        //     default:
        //       messageService.emit('onDisplay', 'Error in graphQLErrors');
        //       break;
        //   }
        // }
        messageService.emit('onDisplay', 'Error in graphQLErrors');
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        messageService.emit('onDisplay', 'Error in Network');
      }
      // return forward(operation);
    });
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        // eslint-disable-next-line no-console
        console.log('-----________INIT Apollo________-------', query, definition);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    const client = new ApolloClient({
      cache,
      link: errorLink.concat(link),
    });
    return client;
  }
}

export default ApolloClientWrapper;
