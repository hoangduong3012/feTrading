// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';
import _ from 'lodash';

export const commonComment = `
id
attributes {
  comment
  commentDate
}
`
export const COMMENT = gql`
  query comments(
    $filters: CommentFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    comments(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      data {
        ${commonComment}
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

export const COMMENT_DETAIL = gql`
  query comment($id: ID) {
    comment(id: $id) {
      data {
        ${commonComment}
      }
    }
  }
`;

export const CREATE = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      data {
        ${commonComment}
      }
    }
  }
`;

export const DELETE = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      ${commonComment}
    }
  }
`;

export const UPDATE = gql`
  mutation updatComment($id: ID! $data:CommentInput! ) {
    updatComment(id: $id data: $data) {
      data {
        ${commonComment}
      }
    }
  }
`;
const api = {
  getComments({ filters, pagination, sort }) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: COMMENT,
      variables: {
        filters,
        ...(!_.isEmpty(sort) && sort),
        pagination,
      },
    });
  },
  getComment(id) {
    const client = new ApolloClientWrapper(true).init();
    return client.query({
      query: COMMENT_DETAIL,
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
};
export default api;
