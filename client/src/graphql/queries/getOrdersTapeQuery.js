import { gql } from "apollo-boost";

const getOrdersTapeQuery = gql`
  query {
    tapes {
      id
      printName
      dateOfAcceptation
      numberOfColors
      color1
      color2
      color3
      glue
      roller
      tapeLong
      tapeColor
      tapeWidth
      tapeThickness
      order {
        id
        quantity
        unit
        document {
          id
          dateOfRealisation
          details
        }
      }
    }
  }
`;

export default getOrdersTapeQuery;
