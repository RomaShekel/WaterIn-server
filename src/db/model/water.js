import { model, Schema } from 'mongoose';
const waterNoteSchema = new Schema(
  {
    userId: {type: String, ref: 'users' },
    volume: { type: Number, required: true },
    drinkTime: { type: String, required: true },
    createdAt: { type: Number, default: () => Number(Date.now())},
    updatedAt: { type: Number, default: () =>  Number(Date.now())}
  },
  { versionKey: false },
);

waterNoteSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Number(Date.now()) });
  next();
});

export const WaterNotesCollection = model('water', waterNoteSchema);
