import { Schema, models, model,Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IPost{
    userID:Types.ObjectId;
    content:string;
    pros:string;
    cons?:string;
    
}

const PostSchema = new Schema<IPost>({
    userID:{type:Schema.Types.ObjectId, required:true ,ref: 'User'},
    content:{type:String, required:true},
    pros:{type:String, required:true},
    cons:{type:String, required:true},

    }
,{timestamps:true});

const Post = models?.Post || model<IPost>("Post", PostSchema);

export default  Post;