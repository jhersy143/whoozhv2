// src/graphql/resolvers.ts
import User from '@/models/User'; 
import Account from '@/models/Account';


const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find(); 
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