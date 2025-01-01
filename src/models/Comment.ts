import { Schema, models, model, Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IComment{
    userID:Types.ObjectId;
    postID:Types.ObjectId;
    comment:string;
    type:String;
    
}

const CommentSchema = new Schema<IComment>({
    userID:{ type:Schema.Types.ObjectId, required:true},
    postID:{ type:Schema.Types.ObjectId, required:true},
    comment:{type:String, required:true},
    type:{type:String, required:true},

    }
,{timestamps:true});

const Comment = models?.Comment || model<IComment>("Comment", CommentSchema);

export default  Comment;