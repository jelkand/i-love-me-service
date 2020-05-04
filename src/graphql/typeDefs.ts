import { gql } from 'apollo-server'

export default gql`
  type Query {
    user(id: ID!): User
    # accomplishmentsByTag(tagId: ID!): [Accomplishment]
  }

  type Mutation {
    createUser(firstName: String, lastName: String): User
    updateUser(id: ID!, firstName: String, lastName: String): Int
    deleteUser(id: ID!): Int

    createAccomplishment(userId: ID!, text: String!): Accomplishment
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    createdAt: String
    updatedAt: String

    accomplishments: [Accomplishment]
  }

  type Accomplishment {
    id: ID!
    user: User!
    userId: ID!

    text: String!
  }

  type Tag {
    id: ID!
    name: String!
  }
`
