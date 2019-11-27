import { gql } from "apollo-boost";

const getOrdersTapeQuery = gql`
  query {
    stretches {
      id
      grossWeight
      netWeight
      sleeve
      stretchColor
      stretchThickness
      order {
        id
        quantity
        document {
          id
          dateOfRealisation
          details
          client {
            name
          }
        }
      }
    }
  }
`;

export default getOrdersTapeQuery;
