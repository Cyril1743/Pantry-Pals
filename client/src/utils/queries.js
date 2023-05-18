import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($_id: ID!) {
    profile(userId: $_id) {
      _id
      username
    }
  }
`;

export const QUERY_RECIPE = gql`
query recipe($name: String!) {
  recipe(name: $name) {
    name
    description
    servings
    ingredients,
    steps,
    recipeAuthor {
      username
    }
  }
}`