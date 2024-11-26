// src/graphql/resolvers.ts
import User from '@/models/User'; 
import Account from '@/models/Account';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import Joined from '@/models/Joined';
import Like from '@/models/Like';
import Reply from '@/models/Reply';
import Choice from '@/models/Choice';
import { UserInputError,ApolloError  } from 'apollo-server-core';

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find(); 
    },
 
    login: async (_:any, { email, password }:{email:string, password:string}) => {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new UserInputError('Wrong username or Password', { invalidArgs: { email } });
      }
      const userID = user.id;
      const account = await Account.findOne({userID})
      console.log(account)
      if(password!=account.password){
        throw new UserInputError(password, { invalidArgs: { password } });
      }
      // Implement your token generation logic
      return  user ;
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

    getAccountByID: async (_: any, { userID }: { userID: string }) => {
      try {
        const account = await User.findOne({userID}); // Assuming you're using Mongoose
        if (!account) {
          throw new UserInputError('User  not found', {
            invalidArgs: { userID },
          });
        }
        return account;
      } catch (error) {
        throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
      }
    },
 

  getPost: async () => {
    return await Post.find(); 
  },
  getCommentByPostID: async (_: any, { id }: { id: string }) => {
    try {
      const user = await Comment.findById(id); // Assuming you're using Mongoose
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
  getReplyByCommentID: async (_: any, { id }: { id: string }) => {
    try {
      const user = Reply.findById(id); // Assuming you're using Mongoose
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
  getLikeByCommentID: async (_: any, { id }: { id: string }) => {
    try {
      const user = await Like.findById(id); // Assuming you're using Mongoose
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
  getJoinedByUserID: async (_: any, { id }: { id: string }) => {
    try {
      const user = await Joined.findById(id); // Assuming you're using Mongoose
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
  getUserChoice: async (_: any, { id, PostID }: { id: string, PostID: string }) => {
    try {
      const user = await Joined.findById(id); // Assuming you're using Mongoose
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
    },
  
  },
};

export default resolvers;