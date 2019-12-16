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
        unit
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
