// src/graphql/resolvers.ts
import User from '@/models/User'; 
import Account from '@/models/Account';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import Joined from '@/models/Joined';
import Like from '@/models/Like';
import Reply from '@/models/Reply';
import Choice from '@/models/Choice';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { UserInputError,ApolloError  } from 'apollo-server-core';
// Define the ChoiceFilter interface
interface ChoiceFilter {
  postID?: string;
  choice?: string;
}
interface JoinedFilter {
  postID?: string;
  userID?: string;
}
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
     // console.log(account)
      const isMatch = await bcrypt.compare(password, account.password);
      if(!isMatch){
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
    getPostByID: async (_:any, {id}:{id:string}) => {
      try{
        const post = await Post.findById(id).populate('userID'); // Populate user 
        if(!post){
          throw new UserInputError('Post not found', {
            invalidArgs:{id},
          })
        }
        return {
          id: post._id,
          userID: post.userID,
          content: post.content,
          pros: post.pros,
          cons: post.cons,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          user: {
            id: post.userID._id,
            firstname: post.userID.firstname,
            lastname: post.userID.lastname,
            email: post.userID.email,
            avatar: post.userID.avatar,
          },
        };
      
      }
      catch(error){
          throw new ApolloError('Error fetching post', 'POST_FETCH_ERROR', { error });
      }


    },

  getPost: async () => {
    const posts = await Post.find().populate('userID'); // Populate user information
    //console.log("post"+posts)
  return posts.map(post => ({
    id: post._id, // Ensure you are returning the correct id
    userID: post.userID,
    content: post.content,
    pros: post.pros,
    cons: post.cons,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    user: post.userID // Add the user field to the post
    
  }));
  },
  countChoice: async (_:any, { choice,postID }:{choice: string, postID: string}) => {
    const filter:ChoiceFilter = {};
    if (choice) filter.choice = choice;
    if (postID) filter.postID = postID;
    const count = await Choice.countDocuments(filter);
    return count;
  },
  getTopPosts: async () => {
    try {
      const topPosts = await Joined.aggregate([
        { $group: { _id: "$postID", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "_id", 
            as: "postDetails"
          }
        },
        {
          $unwind: "$postDetails"
        },
        {
          $lookup: {
            from: "users", // Assuming the users collection is named "users"
            localField: "postDetails.userID", // The field in postDetails that references the user
            foreignField: "_id", // The field in users collection
            as: "userDetails"
          }
        },
        {
          $unwind: {
            path: "$userDetails",
            preserveNullAndEmptyArrays: true // Optional: if you want to keep posts without user details
          }
        },
        {
          $project: {
            postID: "$postDetails._id",
            count: "$count",
            content: "$postDetails.content",
            pros: "$postDetails.pros",
            cons: "$postDetails.cons",
            createdAt: "$postDetails.createdAt",
            user: {
              id: "$userDetails._id",
              firstname: "$userDetails.firstname",
              lastname: "$userDetails.lastname",
            }
          }
        }
      ]);
  
 
      return topPosts;
    } catch (error) {
      console.error("Error in getTopPosts:", error);
      return [];
    }
  },
  countComment: async (_:any, { postID }:{postID: string}) => {
    const filter:ChoiceFilter = {};
    if (postID) filter.postID = postID;

    const count = await Comment.countDocuments(filter);
    return count;
  },
  countJoined: async (_:any, { postID, userID }:{postID: string, userID: string}) => {
    try{
      const filter:JoinedFilter = {};
      if (postID) filter.postID = postID;
      if (userID) filter.userID = userID;
      const count = await Joined.countDocuments(filter);
      return count;
    }
    catch (error) {
      throw new ApolloError('error joined','FETCH_ERROR',{
        error
      });
  }},
  getCommentByPostID: async (_: any, { postID }: { postID: string }) => {
    try {
      const user = await Comment.find({postID:postID}); // Assuming you're using Mongoose
      if (!user) {
        throw new UserInputError('User  not found', {
          invalidArgs: { postID },
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
        email,
        location,
        work,
        contact,
        avatar 
      }: 
      { 
        firstname: string; 
        lastname:string; 
        email: string ;
        location: string;
        work: string;
        contact: string;
        avatar: string;
      }) => {
      const existingUser  = await User.findOne({ email });
        if (existingUser ) {
          throw new UserInputError('Email already exists', {
            invalidArgs: { email },
          });
      }
      const newUser  = new User({ firstname,lastname, email,  location, work, contact, avatar});
      await newUser.save();

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
          userID: string,
          provider?: string, 
          providerAccountID?: string, 
          password?: string, 
          image?: string})=>{
            
     
            try {
            // Validate userID format
              if (!userID || typeof userID !== 'string' || userID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userID)) {
                throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_USER_ID');
            }
             const userObjectId = new ObjectId(userID);
              const newAccount = new Account(
                {
                  userID: userObjectId,
                  provider, 
                  providerAccountID, 
                  password, 
                  image
                }
              );
              await newAccount.save();
      
              return newAccount;
            } catch (error) {
              throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
            
            }
       
    },
    addPost: async(_:any, 
      {
        userID,
        content, 
        pros, 
        cons, 
      }:
        {
          userID: string, 
          content: string, 
          pros: string, 
          cons: string, 
         })=>{
          try {
          
              const newPost = new Post({userID,content, pros, cons});
            await newPost.save();
            return newPost;
          }
          catch(error){
            throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR',{error});
          }
    
    },
    addComment: async(_:any, 
      {
        userID,
        postID, 
        comment, 
        type, 
      }:
        {
          userID: string, 
          postID: string, 
          comment: string, 
          type: string, 
         })=>{
      const newComment = new Post({userID,postID, comment, type});
      await newComment.save();
      return newComment;
    },
    addChoice: async(_:any, 
      {
        userID,
        postID, 
        choice, 
     
      }:
        {
          userID: string, 
          postID: string, 
          choice: string, 
         })=>{
          try {
            // Validate userID format
              if (!postID || typeof postID !== 'string' || postID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(postID)) {
                throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_POST_ID');
            }
            if (!userID || typeof userID !== 'string' || userID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userID)) {
              throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_USER_ID');
          }
             const objectpostID= new ObjectId(postID);
             const objectuserID= new ObjectId(userID);
              const newChoice = new Choice(
                {
                  postID: objectpostID,
                  userID:objectuserID,
                  choice, 
                  
                }
              );
              await newChoice.save();
      
              return newChoice;
            } catch (error) {
              throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
            
            }
     
    },
    addJoined: async(_:any, 
      {
        userID,
        postID, 
        choice,
        status,
     
      }:
        {
          userID: string, 
          postID: string, 
          choice: string, 
          status: string
         })=>{
          try {
            // Validate userID format
              if (!postID || typeof postID !== 'string' || postID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(postID)) {
                throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_POST_ID');
            }
            if (!userID || typeof userID !== 'string' || userID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userID)) {
              throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_USER_ID');
          }
             const objectpostID= new ObjectId(postID);
             const objectuserID= new ObjectId(userID);
              const newJoined = new Joined(
                {
                  postID: objectpostID,
                  userID:objectuserID,
                  choice, 
                  status,
                  
                }
              );
              await newJoined.save();
              return newJoined;
            } catch (error) {
              throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
            
            }
     
    },
  
  },
  
};

export default resolvers;