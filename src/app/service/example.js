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
export const EXAMPLE = gql`
  query exampleTypes(
    $filters: ExampleTypeFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    exampleTypes(
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

export const EXAMPLE_DETAIL = gql`
  query exampleType($id: ID) {
    exampleType(id: $id) {
      data {
        ${common}
      }
    }
  }
`;

export const CREATE = gql`
  mutation createExample($data: ExampleTypeFiltersInput!) {
    createExample(data: $data) {
      ${common}
    }
  }
`;

export const DELETE = gql`
  mutation deleteExample($id: ID!) {
    deleteExample(id: $id) {
      ${common}
    }
  }
`;

export const UPDATE = gql`
  mutation updatExample($id: ID! $data:ExampleInput! ) {
    updatExample(id: $id data: $data) {
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
  getExamples({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: EXAMPLE,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getExample(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: EXAMPLE_DETAIL,
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
