import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface ILike{
    userID:string;
    commentID:string;

    
}

const LikeSchema = new Schema<ILike>({
    userID:{type:String, required:true},
    commentID:{type:String, required:true},


    }
,{timestamps:true});

const Like = models?.Joined || model<ILike>("Like", LikeSchema);

export default  Like;