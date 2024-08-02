import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: true },
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
