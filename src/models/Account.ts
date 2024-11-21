import { Schema, models, model, Types} from "mongoose";


export interface IAccount{
    userID:string;
    provider:string;
    providerAccountID:string;
    password?:string;
    image?:string;
    
}

const AccountSchema = new Schema<IAccount>({
    userID:{type:String},
    provider:{type:String},
    providerAccountID:{type:String},
    password:{type:String, required:true},
    image:{type:String}
        
},{timestamps:true});

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default  Account;