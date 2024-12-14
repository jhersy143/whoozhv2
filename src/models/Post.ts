import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IPost{
    userID:string;
    content:string;
    pros:string;
    cons?:string;
    
}

const PostSchema = new Schema<IPost>({
    userID:{type:String, required:true ,ref: 'User'},
    content:{type:String, required:true},
    pros:{type:String, required:true},
    cons:{type:String, required:true},

    }
,{timestamps:true});

const Post = models?.Post || model<IPost>("Post", PostSchema);

export default  Post;