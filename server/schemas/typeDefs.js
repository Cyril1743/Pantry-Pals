const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    recipe: [Recipes]
    favorites: [Recipes]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Recipes {
    _id: ID
    name: String!
    description: String!
    servings: Int
    ingredients: [Ingredients]
    steps: [Steps]
    recipeAuthor: User
  }

  type Ingredients {
    _id: ID
    ingredientName: String!
    ingredientAmount: Float!
    ingredientUnit: String
  }

  input IngredientsInput {
    _id: ID
    ingredientName: String!
    ingredientAmount: Float!
    ingredientUnit: String
  }

  type Steps {
    _id: ID
    order: Int!
    stepText: String!
  }

  input StepsInput {
    _id: ID
    order: Int!
    stepText: String!
  }

  type Comments {
    _id: ID
    commentText: String!
    createdAt: String
    commentAuthor: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes(username: String): [Recipes]
    recipe(recipeId: ID!): Recipes
    suggestRecipe(name: String!): [Recipes]
    suggestIngredient(ingredients: [String!]): [Recipes]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(name: String!, description: String!, servings: Int, ingredients: [IngredientsInput!]!, steps: [StepsInput!]!): Recipes
    addComment(recipeId: ID!, commentText: String!): Recipes
    removeRecipe(recipeId: ID!): Recipes
    removeComment(recipeId: ID!, commentId: ID!): Recipes
  }
`;
  module.exports = typeDefs;