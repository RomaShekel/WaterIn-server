
import { model, Schema  } from "mongoose";

const usersSchema = new Schema(
{
    email:{type:String, required:true, unique: true},
    password: {type:String, required:true},
    name: {type:String, default:null},
    photo: {type:String, default:null},
    sportHours: {type:Number, default: 0},
    weight: {type:Number, default: 0},
    waterRate: {type:Number, default:1.5},
    gender: {type:String, enum:['woman', 'man'], default:'woman'},
},
{ timestamps:true, versionKey:false },
);

usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };

export const UsersCollection = model('users', usersSchema);