import { model, Schema } from 'mongoose';
const waterNoteSchema = new Schema(
  {
    userId: {type: String, ref: 'users' },
    volume: { type: Number, required: true },
    drinkTime: { type: String, required: true },
    createdAt: { type: Number, default: () => Date.now()},
    updatedAt: { type: Number, default: () => Date.now()}
  },
  { versionKey: false },
);

export const WaterNotesCollection = model('water', waterNoteSchema);
