import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      recipe {
        name
      }
      favorites {
        name
      }
    }
  }
`

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      recipe {
        name
      }
      favorites {
        name
      }
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
}`

export const QUERY_INGREDIENT_NAME = gql`
query suggestIngredient($ingredient: String!) {
  suggestIngredient(ingredient: $ingredient) {
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
}`

export const QUERY_RECIPE = gql`
query recipe($recipeId: ID!) {
  recipe(recipeId: $recipeId) {
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

