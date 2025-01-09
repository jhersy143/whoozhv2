import { Schema, models, model, Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IReaction{
    userID:Types.ObjectId;
    commentID:Types.ObjectId;
    reactionType:string;
    
}

const ReactionSchema = new Schema<IReaction>({
    userID:{type:Schema.Types.ObjectId, required:true},
    commentID:{type:Schema.Types.ObjectId, required:true},
    reactionType:{type:String, required:true}


    }
,{timestamps:true});

const Reaction = models?.Reaction || model<IReaction>("Reaction", ReactionSchema);

export default  Reaction;