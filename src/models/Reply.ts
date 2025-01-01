import { Schema, models, model, Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IReply{
    userID:Types.ObjectId;
    commentID:Types.ObjectId;
    reply:string;
    
}

const ReplySchema = new Schema<IReply>({
    userID:{type:Schema.Types.ObjectId, required:true},
    commentID:{type:Schema.Types.ObjectId, required:true},
    reply:{type:String, required:true},

    }
,{timestamps:true});

const Reply = models?.Reply || model<IReply>("Reply", ReplySchema);

export default  Reply;