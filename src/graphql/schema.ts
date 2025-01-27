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
    userID: ID!
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
    userID: ID!
    comment: String!
    postID: ID!
    user: User!
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

 type Reaction{
    id: ID!
    userID: String!
    commentID: String!
    reactionType:String!
    createdAt: String
    updatedAt: String
  }

 type Joined{
    id: ID!
    userID: ID!
    postID: ID!
    choice:String!
    status:String!
    createdAt: String
    updatedAt: String
    post:Post!
    user:User!
  }

type Choice{
    id: ID!
    userID: String!
    postID: String
    choice: String
    createdAt: String
    updatedAt: String
  }
type Notification{
  id:ID!
  postID:String!
  recipientID:String!
  initiatorID:String!
  is_seen:Boolean!
  description:String!
  user:User!
  createdAt: String
  updatedAt: String
}

 type TopChoice {
    postID: String!
    count: Int!
    content: String!  
    pros: String!      
    cons: String!    
    createdAt: String
    user: User! 
  }
  type Query {
    getUsers: [User!]!
    getUserByID(id:ID!) :User
    getAccountByID(id:ID!): Account
    getAllPost(userID:String!): [Post!]!
    getPostByID(id:ID!): Post
    getCommentByPostID(postID:ID!, type: String!): [Comment!]!
    getReplyByCommentID: [Reply!]
    getPostByUserID(userID:ID!): [Post!]!
    getJoinedByUserID(userID:ID!,postID:ID!):Joined
    getAllJoinedByUserID(userID:ID!):[Joined!]!
    login(email: String!,password: String!) :User
    countChoice(choice:String,postID:String):Int
    countComment(postID:String):Int
    getTopPosts: [TopChoice!]!
    countJoined(postID:String,userID:String): Int
    countReaction(commentID:String,reactionType:String): Int
    getReactionByUserID(commentID:String,userID:String): Reaction
    getNotificationByUser(userID:String): [Notification]!
  }

  type Mutation {
    addUser (firstname: String!,lastname:String, email: String!,location:String, work:String, contact:String, avatar:String): User!
    addAccount (userID: ID!, provider: String, providerAccountID: String, password: String, image: String): Account
    addPost(userID:String!, content:String!, pros:String!, cons:String!): Post 
    addComment(userID:String!,postID:String!, comment:String!, type:String!): Comment
    addChoice(userID:String!,postID:String!, choice:String!): Choice
    addJoined(userID:String!,postID:String!, choice:String!, status:String!): Joined
    addReaction(userID:String!,commentID:String!,reactionType:String): Reaction
    updateReaction(userID:String!,commentID:String!,reactionType:String): Reaction
    addNotification(postID:String!,initiatorID:String!,recipientID:String!,is_seen:Boolean!,description:String!): Notification
  }
`;

export default typeDefs;