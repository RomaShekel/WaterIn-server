import { WaterNotesCollection } from '../db/model/water.js';

export const addWaterNote = async (note) => {
  const data = await WaterNotesCollection.create(note);
  return data;
};

export const updateWaterNote = async (filter, payload, options) => {
  console.log(payload);
  const data = await WaterNotesCollection.findOneAndUpdate(filter, payload, {
    ...options,
  });

  return data;
};

export const deleteWaterNote = async (filter) => {
  const data = await WaterNotesCollection.findOneAndDelete(filter);
  return data;
};
