// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const common = `
    symbol
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
    order_detail {
      data {
        id
        attributes {
          title
          description
          explain_reason_entry
          image_detail {
            data {
              id
              attributes {
                url
                name
                caption
                width
                height
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
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
      ${common}
    }
  }
`;

export const DELETE = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      ${common}
    }
  }
`;

export const UPDATE = gql`
  mutation updatOrder($id: ID! $data:OrderInput! ) {
    updatOrder(id: $id data: $data) {
      data {
        id
        attributes {
          ${common}
        }
      }
    }
  }
`;

// export const REMOVE_TEAMS = gql`
//   mutation removeTeams($ids: [Int!]!) {
//     removeTeams(ids: $ids)
//   }
// `;

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
  //   getTeamItem(condition) {
  //     const client = new ApolloClientWrapper(true).init();
  //     return client.query({
  //       query: TEAM_ITEM,
  //       variables: {
  //         id: condition,
  //       },
  //     });
  //   },
  //   createTeam(data) {
  //     const client = new ApolloClientWrapper(true).init();
  //     return client.mutate({
  //       mutation: CREATE_TEAM,
  //       variables: {
  //         createTeamInput: data,
  //       },
  //     });
  //   },
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
  //   removeTeams(condition) {
  //     const client = new ApolloClientWrapper(true).init();
  //     return client.mutate({
  //       mutation: REMOVE_TEAMS,
  //       variables: {
  //         ids: condition,
  //       },
  //     });
  //   },
};
export default api;
