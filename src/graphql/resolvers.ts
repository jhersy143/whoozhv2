// src/graphql/resolvers.ts
import User from '@/models/User'; 
import Account from '@/models/Account';
import { Types } from 'mongoose';

const resolvers = {
  Query: {
    users: async () => {
      return await User.find(); // Assuming you have a User model
    },
  },
  Mutation: {
    addUser: async (_: any, { firstname,lastname, email }: { firstname: string; lastname:string; email: string }) => {
      const newUser  = new User({ firstname,lastname, email });
      await newUser .save();
      return newUser ;
    },
    addAccount: async(_:any, {userID,provider, providerAccountID, password, image}:{userID: String, provider: String, providerAccountID: String, password?: String, image?: String})=>{
      const newAccount = new Account({userID,provider, providerAccountID, password, image});
      await newAccount.save();
      return newAccount;
    }
  },
};

export default resolvers;