import {schema, models, model, Types} from 'mongoose';

export interface Inotification{
    action:string,
    description: string,
    userID:Types.ObjectId

}
