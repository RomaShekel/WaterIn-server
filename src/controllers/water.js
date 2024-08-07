import createHttpError from 'http-errors';
import {
  addWaterNote,
  deleteWaterNote,
  updateWaterNote,
  getWaterPerMonth,
  getWaterPerDay
} from '../services/water.js';
import { format } from 'date-fns';

export const addWaterController = async (req, res) => {
  const userId = req.user._id;

  const data = await addWaterNote({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    data,
    message: 'Successfully add water note',
  });
};

export const updateWaterController = async (req, res, next) => {
  const { waterId } = req.params;

  const userId = req.user._id;
  console.log(userId);
  console.log(req.body)

  const data = await updateWaterNote(
    {
      _id: waterId,
      userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!data) {
    next(createHttpError(404, `Water note with id ${waterId} not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    data,
    message: `Successfully update water note by id=${data._id}`,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const userId = req.user._id;

  const data = await deleteWaterNote({ _id: waterId, userId });

  if (!data) {
    next(createHttpError(404, `Water note with id ${waterId} not found`));
    return;
  }

  res.status(204).send();
};

export const getWaterPerDayController = async (req, res, next) => {
  const userId = req.user._id;
  const time = Number(req.params.time);

  const notes = await getWaterPerDay(userId, time);

  if(notes.length === 0) {
    res.status(200).json({
      status:200,
      message: 'Water notes not found',
      data: notes
    })
  }

  if(!notes) {
    next(createHttpError(404, 'Water notes not found'))
  }
  
  res.status(200).json({
    status:200,
    message: 'Successful find water notes!',
    data: notes
  })
}

export const getWaterPerMonthController = async (req, res, next) => {
  const userId = req.user._id;
  const userNorm = req.user.waterRate;
  const time = Number(req.params.time);
  const normalFormat = format(time, 'yyyy-MM-dd')
  const monthWaterNotes = await getWaterPerMonth(userId, userNorm, time);
  
  if (monthWaterNotes.length === 0) {
    req.status(200).json({
      status:200,
      message: 'Water notes not found!',
      data: monthWaterNotes,
    })
  };

  if (!monthWaterNotes) {
    next(createHttpError(500, 'Server error'))
  };

  res.status(200).json({
    status: 200,
    message: 'Water notes by date',
    data: {
      date: normalFormat,
      waterNotes: monthWaterNotes,
    }
  })

}