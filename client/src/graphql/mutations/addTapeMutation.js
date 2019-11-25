import { gql } from "apollo-boost";

const addTapeMutation = gql`
  mutation(
    $printName: String!
    $dateOfAcceptation: String!
    $numberOfColors: String!
    $color1: String!
    $color2: String
    $color3: String
    $glue: String!
    $roller: String!
    $tapeColor: String!
    $tapeLong: Int!
    $tapeThickness: Int!
    $tapeWidth: Int!
  ) {
    addTape(
      printName: $printName
      dateOfAcceptation: $dateOfAcceptation
      numberOfColors: $numberOfColors
      color1: $color1
      color2: $color2
      color3: $color3
      glue: $glue
      roller: $roller
      tapeColor: $tapeColor
      tapeLong: $tapeLong
      tapeThickness: $tapeThickness
      tapeWidth: $tapeWidth
    ) {
      id
      printName
      dateOfAcceptation
      numberOfColors
      color1
      color2
      color3
      glue
      roller
      tapeColor
      tapeLong
      tapeThickness
      tapeWidth
    }
  }
`;

export default addTapeMutation;
