// src/graphql/resolvers.ts
import User from '@/models/User'; 
import Account from '@/models/Account';
import Post from '@/models/Post';
import { UserInputError,ApolloError  } from 'apollo-server-core';

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find(); 
    },
    getPost: async () => {
      return await Post.find(); 
    },
    getUserByID: async (_: any, { id }: { id: string }) => {
      try {
        const user = await User.findById(id); // Assuming you're using Mongoose
        if (!user) {
          throw new UserInputError('User  not found', {
            invalidArgs: { id },
          });
        }
        return user;
      } catch (error) {
        throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
      }
    },
    getAccountByID: async (_: any, { id }: { id: string }) => {
      try {
        const account = await User.findById(id); // Assuming you're using Mongoose
        if (!account) {
          throw new UserInputError('User  not found', {
            invalidArgs: { id },
          });
        }
        return account;
      } catch (error) {
        throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
      }
    },
  },
  Mutation: {
    addUser: async (_: any, 
      { 
        firstname,
        lastname, 
        email 
      }: 
      { 
        firstname: string; 
        lastname:string; 
        email: string 
      }) => {
      const existingUser  = await User.findOne({ email });
        if (existingUser ) {
          throw new UserInputError('Email already exists', {
            invalidArgs: { email },
          });
      }
      const newUser  = new User({ firstname,lastname, email });
      await newUser .save();
      return newUser ;
    },
    addAccount: async(_:any, 
      {
        userID,
        provider, 
        providerAccountID, 
        password, 
        image
      }:
        {
          userID: String, 
          provider?: String, 
          providerAccountID?: String, 
          password?: String, 
          image?: String})=>{
      const newAccount = new Account({userID,provider, providerAccountID, password, image});
      await newAccount.save();
      return newAccount;
    }
  },
};

export default resolvers;