// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const HISTORYTRADING = gql`
  query goldLessions(
    $filters: GoldLessionFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    goldLessions(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          title
          description
          personal_ideal
          type
          author
          image_lession {
            data {
              id
              attributes {
                name
                url
                previewUrl
              }
            }
          }
          time_lession
          createdAt
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

export const HISTORYTRADING_DETAIL = gql`
  query goldLession($id: ID) {
    goldLession(id: $id) {
      data {
        id
        attributes {
          title
          description
          personal_ideal
          type
          author
          image_lession {
            data {
              id
              attributes {
                name
                url
                previewUrl
              }
            }
          }
          time_lession
          createdAt
        }
      }
    }
  }
`;

// export const CREATE_TEAM = gql`
//   mutation createTeam($createTeamInput: CreateTeamInput!) {
//     createTeam(createTeamInput: $createTeamInput) {
//       createdby
//       datecreated
//       deletedAt
//       deletedBy
//       deptId
//       id
//       lastupdatedate
//       lastupdatedby
//       leaderId
//       size
//       teamName
//     }
//   }
// `;

export const UPDATE = gql`
  mutation updateGoldLession($id: ID! $data:GoldLessionInput! ) {
    updateGoldLession(id: $id data: $data) {
      data {
        id
        attributes {
          title
          description
          personal_ideal
          type
          author
          image_lession {
            data {
              id
              attributes {
                name
                url
                previewUrl
              }
            }
          }
          time_lession
          createdAt
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
  getGoldLessions({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: HISTORYTRADING,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getGoldLession(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: HISTORYTRADING_DETAIL,
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
