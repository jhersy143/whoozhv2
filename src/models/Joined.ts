import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IJoined{
    userID:string;
    postID:string;

    
}

const JoinedSchema = new Schema<IJoined>({
    userID:{type:String, required:true},
    postID:{type:String, required:true},


    }
,{timestamps:true});

const Joined = models?.Joined || model<IJoined>("Joined", JoinedSchema);

export default  Joined;