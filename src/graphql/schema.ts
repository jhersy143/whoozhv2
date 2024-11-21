// graphql/schema.ts
import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname:String!
    email: String!
    location: String
    work: String
    contact: Int
    createdAt: String
    updatedAt: String
  }
  
  type Account{
    id: ID!
    userID: String!
    provider: String
    providerAccountID: String
    password: String
    image: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUsers: [User!]!
    getUserByID(id:ID!) :User
    getAccountByID(id:ID!) :[Account!]!

  }

  type Mutation {
    addUser (firstname: String!,lastname:String, email: String!): User!
    addAccount (userID: String!, provider: String, providerAccountID: String, password: String, image: String): Account
  }
`;

export default typeDefs;