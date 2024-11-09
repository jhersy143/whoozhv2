import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IUser{
    email:string,
    firstname:string,
    lastname:string,
    location?:string,
    work?:string,
    contact?:Number
    
}

const UserSchema = new Schema({
    email:{type:String, required:true, unique:true,
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    location:{type:String},
    work:{type:String},
    contact:{type:Number}
    }
},{timestamps:true});

const User = models?.user || model<IUser>("User", UserSchema);

export default  User;