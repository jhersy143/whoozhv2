// src/graphql/resolvers.ts
import User from '../models/User'; // Adjust the path as necessary

const resolvers = {
  Query: {
    users: async () => {
      return await User.find(); // Assuming you have a User model
    },
  },
  Mutation: {
    addUser: async (_: any, { name, email }: { name: string; email: string }) => {
      const newUser  = new User({ name, email });
      await newUser .save();
      return newUser ;
    },
  },
};

export default resolvers;