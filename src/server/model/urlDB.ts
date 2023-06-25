
import { Schema, model, connect } from 'mongoose';
//interface 
interface Url {
    shortenUrl:string;
    trueUrl:string;
    date:Date;
    useTimes:Number;
}

const urlSchema = new Schema<Url>(
    {
        shortenUrl:{type:String, required:true},
        trueUrl:{type:String, required:true},
        date:{type:Date, default:Date.now()},
        useTimes:{type:Number, default:0},
    }
)

const Url = model<Url>("Url", urlSchema);

export {Url}
