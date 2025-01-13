import { Schema, models, model, Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IJoined{
    userID:Types.ObjectId;
    postID:Types.ObjectId;
    choice:string;
    status:string;

}

const JoinedSchema = new Schema<IJoined>({
    userID:{type:Schema.Types.ObjectId, required:true},
    postID:{type:Schema.Types.ObjectId, required:true},
    choice:{type:String, required:true},
    status:{type:String, required:true},

    }
,{timestamps:true});

const Joined = models?.Joined || model<IJoined>("Joined", JoinedSchema);

export default  Joined;