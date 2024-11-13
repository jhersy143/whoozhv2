// server.js
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import Account from "@/database/account"
import User from "@/database/user"
import cors from "cors";

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/whoozh", {
  
});

// Define GraphQL schema
const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        firstname: String!
        lastname: String!
        location: String
        work: String
        contact: Int
    }

    type Account {
        id: ID!
        userID: ID!
        provider: String!
        providerAccountID: String!
        password: String!
        image: String
    }

    type Query {
        users: [User]
        accounts: [Account]
    }

    type Mutation {
        createUser(email: String!, firstname: String!, lastname: String!, location: String, work: String, contact: Int): User
        createAccount(userID: ID!, provider: String!, providerAccountID: String!, password: String!, image: String): Account
    }
`;

// Define resolvers
const resolvers = {
    Query: {
        users: async () => await User.find(),
        accounts: async () => await Account.find(),
    },
    Mutation: {
        createUser: async (_:any, { email, firstname, lastname}:{email:string,firstname:string, lastname:string, }) => {
            const user = new User({ email, firstname, lastname});
            await user.save();
            return user;
        },
        createAccount: async (_:any, { userID, provider, providerAccountID, password, image }:{userID:string, provider:string, providerAccountID:string, password:string, image:string}) => {
            const account = new Account({ userID, provider, providerAccountID, password, image });
            await account.save();
            return account;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client URL
    methods: ['GET', 'POST'], // Specify the methods you want to allow
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
server.applyMiddleware({ app,path: 'api/graphql' });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
   
});
