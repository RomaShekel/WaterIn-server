import { model, Schema } from 'mongoose'

const reminderSchema = new Schema(
  {
    userId: {type: String, ref: 'users' },
    email: { type: String, required: true},
    volume: { type: Number, required: true },
    drinkTime: { type: String, required: true },
    whenDrink: { type: Date, required: true },
    autoComplete: { type: Boolean, default: false},
    sendRemindEmail: { type: Boolean, default: true},
    deleteIfNotComplete: { type: Boolean, default: true},
    isSended: { type: Boolean, default: false},
    createdAt: { type: Number, default: () => Number(Date.now())},
    updatedAt: { type: Number, default: () =>  Number(Date.now())}
  },
  { versionKey: false },
);

reminderSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Number(Date.now()) });
    next();
});

export const ReminderCollection = model('reminder', reminderSchema)