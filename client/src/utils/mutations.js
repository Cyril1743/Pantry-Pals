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
  mutation addRecipe($name: String!, $description: String!, $servings: Int, $ingredients: [String!], $steps: [String!]) {
    addRecipe(name: $name, description: $description, servings: $servings, ingredients: $ingredients, steps: $steps) {
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

export const ADD_COMMENT = gql`
mutation addComment($recipeId: ID!, $commentText: String!) {
  addComment(recipeId: $recipeId, commentText: $commentText) {
    name,
    description,
    servings,
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
}`