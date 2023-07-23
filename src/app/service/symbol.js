// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const common = `
id
attributes {
  symbolNm: String
  img {
    data {
      id 
      attributes {
        name
        caption
        width
        height
        url
      }
    }
  }
}
`
export const SYMBOL = gql`
  query symbols(
    $filters: SymbolFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    symbols(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      data {
        ${common}
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

export const SYMBOL_DETAIL = gql`
  query symbol($id: ID) {
    symbol(id: $id) {
      data {
        ${common}
      }
    }
  }
`;

export const CREATE = gql`
  mutation createSymbol($data: SymbolInput!) {
    createSymbol(data: $data) {
      data {
        ${common}
      }
    }
  }
`;

export const CREATE_SYMBOL = gql`
mutation createSymbol($data: SymbolInput!) {
  createSymbol(data: $data) {
    data {
      id
      attributes {
        symbol
        symbolDate
        symbol {
          data {
            ${common}
          }
        }
      }
    }
  }
}
`;

export const DELETE = gql`
  mutation deleteSymbol($id: ID!) {
    deleteSymbol(id: $id) {
      ${common}
    }
  }
`;

export const UPDATE = gql`
  mutation updateSymbol($id: ID! $data:SymbolInput! ) {
    updateSymbol(id: $id data: $data) {
      data {
        ${common}
      }
    }
  }
`;

export const REMOVE_SYMBOL = gql`
  mutation deleteSymbol($id: ID!) {
    deleteSymbol(id: $id) {
      data {
        ${common}
      }
    }
  }
`;

const api = {
  getSymbols({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: SYMBOL,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getSymbol(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: SYMBOL_DETAIL,
      variables: { id },
    });
  },
    add(data) {
      const client = new ApolloClientWrapper(true).init();
      return client.mutate({
        mutation: CREATE,
        variables: {
          data: data,
        },
      });
    },
    addSymbol(data) {
      const client = new ApolloClientWrapper(true).init();
      return client.mutate({
        mutation: CREATE_SYMBOL,
        variables: {
          data: data,
        },
      });
    },
    update(data) {
      const client = new ApolloClientWrapper(true).init();
      const {__typename, image_lession, createdAt, id, ...newData} = data;
      return client.mutate({
        mutation: UPDATE,
        variables: {
          id: id,
          data: newData,
        },
      });
    },
    delete(condition) {
      const client = new ApolloClientWrapper(true).init();
      return client.mutate({
        mutation: REMOVE_SYMBOL,
        variables: {
          id: condition,
        },
      });
    },
};
export default api;
