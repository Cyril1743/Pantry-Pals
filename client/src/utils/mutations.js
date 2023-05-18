import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe($name: String!, $description: String!, $servings: Int, $ingredientName: String!, $ingredientAmount: Float!, $ingredientUnit: String, $order: Int!, $stepText: String!) {
    addRecipe(name: $name, description: $description, servings: $servings, ingredientName: $ingredientName, ingredientAmount: $ingredientAmount, ingredientUnit: $ingredientUnit, order: $order, stepText: $stepText) {
      name
      description
      servings
      ingredients {
        ingredientName
        ingredientAmount
        ingredientUnit
      }
      steps {
        order
        stepText
      }
    }
  }
`;