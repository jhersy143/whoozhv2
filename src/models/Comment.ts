import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IComment{
    userID:string;
    postID:string;
    comment:string;
    type:String;
    
}

const CommentSchema = new Schema<IComment>({
    userID:{type:String, required:true},
    postID:{type:String, required:true},
    comment:{type:String, required:true},
    type:{type:String, required:true},

    }
,{timestamps:true});

const Comment = models?.Comment || model<IComment>("Comment", CommentSchema);

export default  Comment;