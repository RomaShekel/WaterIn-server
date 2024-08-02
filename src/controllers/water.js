import createHttpError from 'http-errors';
import {
  addWaterNote,
  deleteWaterNote,
  updateWaterNote,
} from '../services/water.js';

export const addWaterController = async (req, res) => {
  //   const userId = req.user._id;
  // { ...req.body, userId }

  const data = await addWaterNote(req.body);

  res.status(201).json({
    status: 201,
    data,
    message: 'Seccessufuly add water note',
  });
};

export const updateWaterController = async (req, res, next) => {
  console.log('first');

  const { waterId } = req.params;
  console.log(waterId);
  //   const userId = req.user._id;
  // {
  //   _id: waterId, userId;
  // }

  const data = await updateWaterNote({ _id: waterId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    next(createHttpError(404, `Water note with id ${waterId} not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    data,
    message: `Successfuly update water note by id=${data._id}`,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  //   const userId = req.user._id;
  // { _id: waterId, userId }

  const data = await deleteWaterNote({ _id: waterId });

  if (!data) {
    next(createHttpError(404, `Water note with id ${waterId} not found`));
    return;
  }

  res.status(204).send();
};
