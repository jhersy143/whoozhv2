import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IReply{
    userID:string;
    commentID:string;
    reply:string;
    
}

const ReplySchema = new Schema<IReply>({
    userID:{type:String, required:true},
    commentID:{type:String, required:true},
    reply:{type:String, required:true},

    }
,{timestamps:true});

const Reply = models?.Reply || model<IReply>("Reply", ReplySchema);

export default  Reply;