import { Schema, models, model, Types} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IChoice{
    userID:Types.ObjectId;
    postID:Types.ObjectId;
    choice:string;
 
}

const ChoiceSchema = new Schema<IChoice>({
    userID:{type:Schema.Types.ObjectId, required:true},
    postID:{type:Schema.Types.ObjectId, required:true},
    choice:{type:String, required:true},
 

    }
,{timestamps:true});

const Choice = models?.Choice || model<IChoice>("Choice", ChoiceSchema);

export default  Choice;