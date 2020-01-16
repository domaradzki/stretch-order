import { gql } from "apollo-boost-upload";

const addStretchMutation = gql`
  mutation(
    $sleeve: Int!
    $stretchColor: String!
    $stretchThickness: Int!
    $netWeight: Float!
    $grossWeight: Float!
  ) {
    addStretch(
      sleeve: $sleeve
      stretchColor: $stretchColor
      stretchThickness: $stretchThickness
      netWeight: $netWeight
      grossWeight: $grossWeight
    ) {
      id
      sleeve
      stretchColor
      stretchThickness
      netWeight
      grossWeight
    }
  }
`;

export default addStretchMutation;
