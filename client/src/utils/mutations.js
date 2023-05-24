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
  mutation addRecipe($name: String!, $description: String!, $servings: Int, $ingredients: [IngredientsInput!]!, $steps: [StepsInput!]!) {
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

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
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
      recipeAuthor {
        username
        _id
      }
      comments {
        commentAuthor {
          username
          _id
        }
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation addComment($recipeId: ID!, $commentText: String!) {
  addComment(recipeId: $recipeId, commentText: $commentText) {
    comments {
      commentAuthor {
        _id
        username
      }
      commentText
      createdAt
    }
  }
}`;

export const REMOVE_COMMENT = gql`
mutation removeComment($recipeId: ID!, $commentId: ID!){
  removeComment(recipeId: $recipeId, commentId: $commentId){
    comments {
      commentAuthor {
        _id
        username
      }
      _id
      commentText
      createdAt
    }
  }
}`;