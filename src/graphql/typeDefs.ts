import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    user(id: String!): User
  }

  type Mutation {
    createUser(firstName: String, lastName: String): User
    updateUser(id: String!, firstName: String, lastName: String): Int
    deleteUser(id: String!): Int
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    createdAt: String
    updatedAt: String
  }
`
