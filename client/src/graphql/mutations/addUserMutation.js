import { gql } from "apollo-boost";

const addUserMutation = gql`
  mutation($name: String!, $email: String, $login: String, $password: String) {
    addUser(name: $name, email: $email, login: $login, password: $password) {
      id
      name
      email
      login
      password
    }
  }
`;

export default addUserMutation;
