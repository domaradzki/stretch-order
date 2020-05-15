import gql from 'graphql-tag';

const singleGetFile = gql`
  query {
    getFile {
      id
      filename
    }
  }
`;

export default singleGetFile;
