// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const common = `
id
attributes {
  name
  description
  isDeleted
  createdAt
  updatedAt
  publishedAt
}
`
export const PRACTICE = gql`
  query practices(
    $filters: PracticeFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    practices(
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

export const PRACTICE_DETAIL = gql`
  query practice($id: ID) {
    practice(id: $id) {
      data {
        ${common}
      }
    }
  }
`;

export const CREATE = gql`
  mutation createPractice($data: PracticeInput!) {
    createPractice(data: $data) {
      ${common}
    }
  }
`;

export const DELETE = gql`
  mutation deletePractice($id: ID!) {
    deletePractice(id: $id) {
      ${common}
    }
  }
`;

export const UPDATE = gql`
  mutation updatPractice($id: ID! $data:PracticeInput! ) {
    updatPractice(id: $id data: $data) {
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
  getPractices({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: PRACTICE,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getPractice(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: PRACTICE_DETAIL,
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
