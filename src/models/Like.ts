import { Schema, models, model, Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface ILike{
    userID:Types.ObjectId;
    commentID:Types.ObjectId;

    
}

const LikeSchema = new Schema<ILike>({
    userID:{type:Schema.Types.ObjectId, required:true},
    commentID:{type:Schema.Types.ObjectId, required:true},


    }
,{timestamps:true});

const Like = models?.Joined || model<ILike>("Like", LikeSchema);

export default  Like;