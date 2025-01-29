// src/graphql/resolvers.ts
import User from '@/models/User'; 
import Account from '@/models/Account';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import Joined from '@/models/Joined';
import Reaction from '@/models/Reaction';
import Reply from '@/models/Reply';
import Choice from '@/models/Choice';
import Notification from '@/models/Notification';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { UserInputError,ApolloError  } from 'apollo-server-core';
import { join } from 'path';
// Define the ChoiceFilter interface
interface ChoiceFilter {
  postID?: string;
  choice?: string;
}
interface JoinedFilter {
  postID?: string;
  userID?: string;
}
interface LikeFilter {
  commentID?: string;
  reactionType?:string;
  userID?:string;
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

    getAllPost: async (_:any,{userID}:{userID:string}) => {
      const userObjectId = new ObjectId(userID);
    const posts = await Post.find({ userID: { $ne: userID } }).populate('userID'); // Populate user information

  try{

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
  }
  catch(error){
    throw new ApolloError('Error fetching posts', 'POST_FETCH_ERROR', { error });
  }

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
  countReaction: async (_:any, { commentID,reactionType }:{commentID: string, reactionType: string}) => {
    try{
      const filter:LikeFilter = {};
      if (commentID) filter.commentID = commentID;
      if (reactionType) filter.reactionType = reactionType;

      const count = await Reaction.countDocuments(filter);
      return count;
    }
    catch (error) {
      throw new ApolloError('error joined','FETCH_ERROR',{
        error
      });
  }},
  getReactionByUserID: async (_:any, { commentID,userID }:{commentID: string, userID: string}) => {
    try{
      const filter:LikeFilter = {};
      if (commentID) filter.commentID = commentID;
      if (userID) filter.userID = userID;

      const reaction = await Reaction.findOne(filter);
    
      return reaction;
    }
    catch (error) {
      throw new ApolloError('error joined','FETCH_ERROR',{
        error
      });
  }},
  getCommentByPostID: async (_: any, { postID, type }: { postID: string, type: string }) => {
    try {
      const comment = await Comment.find({postID:postID, type:type}).populate('userID'); // Assuming you're using Mongoose
      if (!comment) {
        throw new UserInputError('User  not found', {
          invalidArgs: { postID },
        });
      }
    
      return comment.map((comment) => ({
        id:comment._id,
        postID: comment.postID,
        comment: comment.comment,
        type:comment.type,
        userID: comment.userID,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        user: {
          id: comment.userID._id.toString(),
          firstname: comment.userID.firstname,
          lastname: comment.userID.lastname,
          email: comment.userID.email,
          avatar: comment.userID.avatar,
        },
      }));
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


  getJoinedByUserID: async (_: any, { userID, postID }: { userID: string, postID: string }) => {
    try {
      const objectUserID = new ObjectId(userID);
      const objectPostID = new ObjectId(postID);
      const joined = await Joined.findOne({userID:objectUserID,postID:objectPostID}); // Assuming you're using Mongoose
      if (!joined) {
        throw new UserInputError('Joined  not found', {
          invalidArgs: { postID },
        });
      }
      return joined;
    } catch (error) {
      throw new ApolloError('Error fetching Joined', 'USER_FETCH_ERROR', { error });
    }
  },
  getAllJoinedByUserID: async (_: any, { userID }: { userID: string}) => {
    try {
      const objectUserID = new ObjectId(userID);
      const joined = await Joined.find({userID:objectUserID}).populate({
        path: 'postID',
        populate: {
            path: 'userID', // Populate the userID in the Post model

        },
      });// Assuming you're using Mongoose
      if (!joined) {
        throw new UserInputError('Joined  not found', {
          invalidArgs: { userID },
        });
      }
   
      return joined.map((joined)=>{
        const post = joined.postID;
        return{
          id:joined.id,
          post:{
            id:joined.postID.id.toString(),
            content:joined.postID.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: {
              id: post.userID._id.toString(),
              firstname: post.userID.firstname,
              lastname: post.userID.lastname,
              email: post.userID.email,
              avatar: post.userID.avatar,
              createdAt: post.userID.createdAt,
              updatedAt: post.userID.updatedAt
            },
          },
        }
       
    
      

      });


    } catch (error) {
      throw new ApolloError('Error fetching Joined', 'USER_FETCH_ERROR', { error });
    }
  },
  getPostByUserID: async (_: any, { userID }: { userID: string }) => {
    try {
      const objectUserID = new ObjectId(userID);
      const post = await Post.find({userID:objectUserID}).populate('userID'); // Assuming you're using Mongoose
      if (!post) {
        throw new UserInputError('Joined  not found', {
          invalidArgs: { userID },
        });
      }
      return post.map((post)=>({
        
          id:post.id.toString(),
          content:post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          user: {
            id: post.userID._id.toString(),
            firstname: post.userID.firstname,
            lastname: post.userID.lastname,
            email: post.userID.email,
            avatar: post.userID.avatar,
            createdAt: post.userID.createdAt,
            updatedAt: post.userID.updatedAt
          }
        
      })
      );
      

    } catch (error) {
      throw new ApolloError('Error fetching Joined', 'USER_FETCH_ERROR', { error });
    }
  },
  getNotificationByUser: async (_: any, { userID }: { userID: string }) => {
    try {
      const objectUserID = new ObjectId(userID);
      const notifications = await Notification.find({recipientID:objectUserID}).populate('initiatorID').sort({createdAt:-1}).limit(5); // Assuming you're using Mongoose
      if (!notifications) {
        throw new UserInputError('Notif  not found', {
          invalidArgs: { userID },
        });
      }
      console.log(notifications)
      const totalCount = await Notification.countDocuments({recipientID:objectUserID});
      return notifications.map((notification)=>({
        
          id:notification._id,
          description:notification.description,
          is_seen: notification.is_seen,
          postID:notification.postID,
          createdAt: notification.updatedAt,
          user: {
            id: notification.initiatorID._id.toString(),
            firstname: notification.initiatorID.firstname,
            lastname: notification.initiatorID.lastname,
            email: notification.initiatorID.email,
            avatar: notification.initiatorID.avatar,
            
          }
        
      }
      )
      );
      

    } catch (error) {
      throw new ApolloError('Error fetching Notif', 'USER_FETCH_ERROR', { error });
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
          try{
            if (!postID || typeof postID !== 'string' || postID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(postID)) {
              throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_POST_ID');
             }
           if (!userID || typeof userID !== 'string' || userID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userID)) {
              throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_USER_ID');

            }
            const newComment = new Comment({userID,postID, comment, type});
            await newComment.save();
            return newComment;
          }
          catch(error){
            throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR',{error});
          }
             
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
    addReaction: async(_:any, 
      {
        userID,
        commentID, 
        reactionType, 
     
      }:
        {
          userID: string, 
          commentID: string, 
          reactionType: string, 
         })=>{
          try {
            // Validate userID format
              if (!commentID || typeof commentID !== 'string' || commentID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(commentID)) {
                throw new ApolloError('Invalid postID format. It must be a 24-character hexadecimal string.', 'INVALID_POST_ID');
            }
            if (!userID || typeof userID !== 'string' || userID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(userID)) {
              throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_USER_ID');
          }
             const objectcommentID = new ObjectId(commentID);
             const objectuserID = new ObjectId(userID);
              const newReaction = new Reaction(
                {
                  commentID: objectcommentID,
                  userID:objectuserID,
                  reactionType, 
                  
                }
              );
              await newReaction.save();
          
              return newReaction;
            } catch (error) {
              throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
            
            }
     
    },
    updateReaction: async (_:any, 
      { 
        userID, 
        commentID, 
        reactionType 

      }:
      {
        
        userID:string, 
        commentID:string, 
        reactionType:string

      }) => {
      try {
        const reaction = await Reaction.findOneAndUpdate(
          { userID, commentID },
          { reactionType },
          { new: true }
        );
        return reaction;
      } catch (error) {
        throw new ApolloError('Error updating reaction', 'REACTION_UPDATE_ERROR', { error });
      }
    },
    updateProfile: async (_:any, 
      { 
        id, 
        firstname,
        lastname, 
        email,
        location,
        work,
        contact,
        avatar 

      }:
      {
        id:string
        firstname:string,
        lastname:string, 
        email:string,
        location:string,
        work:string,
        contact:string,
        avatar:string, 

      }) => {
      try {
        const reaction = await Reaction.findOneAndUpdate(
          { id },
          { firstname,
            lastname, 
            email,
            location,
            work,
            contact,
            avatar  },
          { new: true }
        );
        return reaction;
      } catch (error) {
        throw new ApolloError('Error updating reaction', 'REACTION_UPDATE_ERROR', { error });
      }
    },
    addNotification: async(_:any, 
      {
        recipientID,
        initiatorID, 
        postID, 
        description,
        is_seen
     
      }:
        {
          recipientID: string, 
          initiatorID: string, 
          postID: string, 
          description:string,
          is_seen:boolean
         })=>{
          try {
            // Validate userID format
              if (!recipientID || typeof recipientID !== 'string' || recipientID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(recipientID)) {
                throw new ApolloError('Invalid postID format. It must be a 24-character hexadecimal string.', 'INVALID_POST_ID');
            }
            if (!initiatorID || typeof initiatorID !== 'string' || initiatorID.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(initiatorID)) {
              throw new ApolloError('Invalid userID format. It must be a 24-character hexadecimal string.', 'INVALID_USER_ID');
          }
             const objectrecipientID = new ObjectId(recipientID);
             const objectinitiatorID = new ObjectId(initiatorID);
             const objectpostID = new ObjectId(postID);
          
              const newNotif = new Notification(
                {
                  recipientID: objectrecipientID, 
                  initiatorID: objectinitiatorID, 
                  postID:objectpostID,
                  description,
                  is_seen
                }
              );
              await newNotif.save();
          
              return newNotif;
            } catch (error) {
              throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR', { error });
            
            }
     
    },
    updateNotif: async (_:any, 
      { 
        id, 
        is_seen 

      }:
      {
        
        id:string, 
        is_seen:boolean, 
   

      }) => {
      try {
        const objectId = new ObjectId(id);
        const notif = await Notification.findOneAndUpdate(
          { _id:objectId },
          { is_seen },
          { new: true }
        );
        return notif;
      } catch (error) {
        throw new ApolloError('Error updating reaction', 'REACTION_UPDATE_ERROR', { error });
      }
    },
  },
  
};

export default resolvers;