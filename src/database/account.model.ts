import { Schema, models, model} from "mongoose";
import {unique } from "next/dist/build/utils";

export interface IUser{
    userID:Object,
    provider:string,
    password?:string,
    image?:string
    
}

const UserSchema = new Schema({
    userID:{type:Object,
    provider:{type:String, required:true},
    password:{type:String, required:true},
    image:{type:String}
        
    }
},{timestamps:true});

const User = models?.user || model<IUser>("User", UserSchema);

export default  User;