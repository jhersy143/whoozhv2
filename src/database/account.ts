import { Schema, models, model, Types} from "mongoose";


export interface IAccount{
    userID:Types.ObjectId;
    provider:string;
    providerAccountID:string;
    password?:string;
    image?:string;
    
}

const AccountSchema = new Schema<IAccount>({
    userID:{type:Schema.Types.ObjectId, ref:"User", required:true},
    provider:{type:String, required:true},
    providerAccountID:{type:String,required:true},
    password:{type:String, required:true},
    image:{type:String}
        
},{timestamps:true});

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default  Account;