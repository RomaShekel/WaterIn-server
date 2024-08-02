import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String },
    email: { type: String },
    photo: { type: String },
    sportHours: { type: Number },
    weight: { type: Number },
    waterRate: { type: Number },
    gender: { type: String, enum: ['woman', 'man'] },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const SessionsCollection = model('sessions', sessionSchema);
