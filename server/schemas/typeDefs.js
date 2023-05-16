const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    recipe: [Recipes]!
    favorite: [Recipes]!
  }

  type Recipes {
    _id: ID
    name: String!
    description: String!
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
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addRecipe(name: String!, description: String!, servings: Int, ingredientName: String!, ingredientAmount: Int!, ingredientUnit: String, order: Int!, stepText: String!): Recipes
    addComment(recipeId: ID!, commentText: String!): Recipes
    removeRecipe(recipeId: ID!): Recipes
    removeComment(recipeId: ID!, commentId: ID!): Recipes
  }
`;
  module.exports = typeDefs;