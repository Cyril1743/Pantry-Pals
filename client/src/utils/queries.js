import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      username
    }
  }
`

export const QUERY_RECIPE_NAME = gql`
query suggestRecipe($name: String!) {
  suggestRecipe(name: $name) {
    _id
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
    }
  }
}`;