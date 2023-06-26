// eslint-disable-next-line import/no-extraneous-dependencies
import { gql } from '@apollo/client';
import ApolloClientWrapper from '@util/apolloClient';

export const UPLOAD_IMG = gql`
  mutation upload($refId: ID, $ref: String, $field: String, $info: FileInfoInput, $file: Upload!) {
    upload(refId: $refId, ref: $ref, field: $field, info: $info, file: $file) {
      data {
        id
        attributes {
          url
          name
        }
      }
    }
  }
`;

const api = {
  upload(data) {
    const client = new ApolloClientWrapper(true).init();
    return client.mutate({
      mutation: UPLOAD_IMG,
      variables: { info: data.info, file: data.files },
    });
  },
};
export default api;
