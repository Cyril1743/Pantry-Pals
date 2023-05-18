import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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