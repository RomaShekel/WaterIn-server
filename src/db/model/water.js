import { model, Schema } from 'mongoose';

// закоментував щоб ти міг перевірити поки нема авторизації
// як тільки вона буде я зроблю всі роути приватними поки вони публічні

const waterNoteSchema = new Schema(
  {
    // userId: { type:String, required: true },
    volume: { type: Number, required: true },
    drinkTime: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const WaterNotesCollection = model('water', waterNoteSchema);
