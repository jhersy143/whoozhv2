import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IUser{
    email:string;
    firstname:string;
    lastname:string;
    location?:string;
    work?:string;
    contact?:String;
    avatar?:string
    
}

const UserSchema = new Schema<IUser>({
    email:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    location:{type:String},
    work:{type:String},
    contact:{type:String},
    avatar:{type:String}
    }
,{timestamps:true});

const User = models?.User || model<IUser>("User", UserSchema);

export default  User;