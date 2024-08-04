import { WaterNotesCollection } from '../db/model/water.js';
import { 
  format,
  getUnixTime, 
  startOfMonth, 
  endOfMonth,
  startOfDay,
  endOfDay
} from 'date-fns'

export const addWaterNote = async (note) => {
  const data = await WaterNotesCollection.create(note);
  return data;
};

export const updateWaterNote = async (filter, payload, options) => {
  const data = await WaterNotesCollection.findOneAndUpdate(filter, payload, {
    ...options,
  });

  return data;
};

export const deleteWaterNote = async (filter) => {
  const data = await WaterNotesCollection.findOneAndDelete(filter);
  return data;
};

export const getWaterPerDay = async (userId, day) => {
  const date = new Date(day);

  const resetDay = startOfDay(date)
  const endDay = endOfDay(date)
  const dayStartInUnix = getUnixTime(resetDay) * 1000;
  const dayEndInUnix = getUnixTime(endDay) * 1000;

  const dayWater = await WaterNotesCollection
  .find({userId: userId})
  .where('createdAt')
  .gte(dayStartInUnix)
  .lte(dayEndInUnix)
  .sort({createdAt: 1})
  .sort({drinkTime: 1})

  return dayWater;
}

export const getWaterPerMonth = async (userId, userNorm = 1500, time) => {
  const date = new Date(time);

  const resetMonth = startOfMonth(date);
  const endMonth = endOfMonth(date)
  const monthStartInUnix = getUnixTime(resetMonth) * 1000;
  const monthEndInUnix = getUnixTime(endMonth) * 1000;

  const monthWater = await WaterNotesCollection.aggregate([
    {
      $match: {
        userId: userId,
        createdAt: {
          $gt: monthStartInUnix,
          $lte: monthEndInUnix
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$createdAt" } } },
        dayVolume: { $sum: "$volume" }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        dayVolume: 1,
        percent: {
          $cond: {
            if: { $gt: ["$dayVolume", 0] },
            then: {
              $min: [
                { $round: [{ $multiply: [{ $divide: ["$dayVolume", userNorm] }, 100] }, 0] },
                100
              ]
            },
            else: 0
          }
        }
      }
    },
    {
      $sort: { date: 1 }
    }
  ]);
  
  const dates = [];
  let currentDate = monthStartInUnix;
  while (currentDate <= monthEndInUnix) {
    dates.push({ date: format(currentDate, 'yyyy-MM-dd'), dayVolume: 0, percent: 0 });
    currentDate = currentDate + 86400000;
  }
  
  const result = dates.map(date => {
    const entry = monthWater.find(item => item.date === date.date);
    return entry ? entry : { ...date };
  });

  return result;
}
