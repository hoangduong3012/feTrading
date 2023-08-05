// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const common = `
    symbol {
      data { 
        id
        attributes {
          symbolNm
        }
      }
    } 
    ticket
    time
    type
    order_price
    stop_loss
    take_profit
    volume
    cut_price
    profit
    createdAt
    updatedAt
    publishedAt
    status
    description
`
export const ORDER = gql`
  query orders(
    $filters: OrderFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    orders(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          ${common}
        }
   
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

export const ORDER_DETAIL = gql`
  query order($id: ID) {
    order(id: $id) {
      data {
        id
        attributes {
          ${common}
        }
      }
    }
  }
`;

export const CREATE = gql`
  mutation createOrder($data: OrderInput!) {
    createOrder(data: $data) {
      data {
        id
        attributes {
          ${common}
        }
      }
    }
  }
`;

export const DELETE = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      data {
        id
        attributes {
          ${common}
        }
      }
    }
  }
`;

export const UPDATE = gql`
  mutation updateOrder($id: ID! $data:OrderInput! ) {
    updateOrder(id: $id data: $data) {
      data {
        id
        attributes {
          ${common}
        }
      }
    }
  }
`;

const api = {
  getOrders({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: ORDER,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getOrder(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: ORDER_DETAIL,
      variables: { id },
    });
  },
    update(data) {
      const client = new ApolloClientWrapper(true).init();
      const {__typename, createdAt, id, ...newData} = data;
      return client.mutate({
        mutation: UPDATE,
        variables: {
          id,
          data: newData,
        },
      });
    },
    add(data) {
      const client = new ApolloClientWrapper(true).init();
      return client.mutate({
        mutation: CREATE,
        variables: {
          data: {...data},
        },
      });
    },
    deleteOrder(condition) {
      const client = new ApolloClientWrapper(true).init();
      return client.mutate({
        mutation: DELETE,
        variables: {
          id: condition,
        },
      });
    },
};
export default api;
