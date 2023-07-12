// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const common = `
id
attributes {
  title
  description
  planDate
  comments {
    data {
      id 
      attributes {
        comment
        commentDate
      }
    }
  }
  symbol {
    data {
      id 
      attributes {
        symbolNm
        img {
          data {
            id
            attributes {
              alternativeText
              name
              caption
              size
              url
            }
          }
        }
      }
    }
  }
}
`
export const PLAN = gql`
  query plans(
    $filters: PlanFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    plans(
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

export const PLAN_DETAIL = gql`
  query plan($id: ID) {
    plan(id: $id) {
      data {
        ${common}
      }
    }
  }
`;

export const CREATE = gql`
  mutation createPlan($data: PlanInput!) {
    createPlan(data: $data) {
      data {
        ${common}
      }
    }
  }
`;

export const DELETE = gql`
  mutation deletePlan($id: ID!) {
    deletePlan(id: $id) {
      ${common}
    }
  }
`;

export const UPDATE = gql`
  mutation updatPlan($id: ID! $data:PlanInput! ) {
    updatPlan(id: $id data: $data) {
      data {
        ${common}
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
  getPlans({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: PLAN,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getPlan(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: PLAN_DETAIL,
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
    add(data) {
      const client = new ApolloClientWrapper(true).init();
      return client.mutate({
        mutation: CREATE,
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
