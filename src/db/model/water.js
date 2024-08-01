import { model, Schema } from "mongoose";

const waterNoteSchema = new Schema(
{
    userId: { type:String, required: true },
    volume: { type:Number, required:true },
    drinkTime: { type:String, required:true },
},
{ timestamps:true, versionKey:false },
);

export const WaterNotesCollection = model('water', waterNoteSchema);