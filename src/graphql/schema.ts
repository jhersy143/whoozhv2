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
    contact: String
    avatar:String
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

   type Post{
    id: ID!
    userID: String!
    user:User
    content: String!
    pros: String!
    cons: String!
    createdAt: String
    updatedAt: String
  }
    
 type Comment{
    id: ID!
    userID: String!
    comment: String!
    postID: String!
    type: String!
    createdAt: String
    updatedAt: String
  }

 type Reply{
    id: ID!
    userID: String!
    reply: String!
    commentID: String!
    createdAt: String
    updatedAt: String
  }

 type Like{
    id: ID!
    userID: String!
    commentID: String!
    createdAt: String
    updatedAt: String
  }

 type Joined{
    id: ID!
    userID: String!
    postID: String!
    createdAt: String
    updatedAt: String
  }

type Choice{
    id: ID!
    userID: String!
    postID: String
    choice: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUsers: [User!]!
    getUserByID(id:ID!) :User
    getAccountByID(id:ID!): Account
    getPost: [Post!]!
    getCommentByPostID: [Comment!]!
    getReplyByCommentID: [Reply!]
    getPostByUserID(id:ID!): [Post!]!
    getLikeByCommentID(id:ID!):Like
    getJoinedByUserID(id:ID!):Joined
    getUserChoice(id:ID!,postID:ID!):Choice
    login(email: String!,password: String!) :User
    countPros(choice:String,postID:String):Int
    countCons(choice:String):Int
    countComment(postID:String):Int
  }

  type Mutation {
    addUser (firstname: String!,lastname:String, email: String!,location:String, work:String, contact:String, avatar:String): User!
    addAccount (userID: String!, provider: String, providerAccountID: String, password: String, image: String): Account
    addPost(userID:String!, content:String!, pros:String!, cons:String!): Post 
    addComment(userID:String!,postID:String!, comment:String!, type:String!): Comment
  }
`;

export default typeDefs;