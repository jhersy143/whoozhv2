import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IChoice{
    userID:string;
    postID:string;
    choice:string;
 
}

const ChoiceSchema = new Schema<IChoice>({
    userID:{type:String, required:true},
    postID:{type:String, required:true},
    choice:{type:String, required:true},
 

    }
,{timestamps:true});

const Choice = models?.Choice || model<IChoice>("Choice", ChoiceSchema);

export default  Choice;