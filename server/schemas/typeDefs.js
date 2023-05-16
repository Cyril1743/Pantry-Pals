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

  }

  type Mutation {
    
  }
`;
  module.exports = typeDefs;