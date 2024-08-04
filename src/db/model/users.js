import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/user.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const usersSchema = new Schema(
  {
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'User' },
    photo: { type: String, default: null },
    sportHours: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    waterRate: { type: Number, default: 1500 },
    gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.post('save', mongooseSaveError);

usersSchema.pre('findOneAndUpdate', setUpdateSettings);

usersSchema.post('findOneAndUpdate', mongooseSaveError);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
