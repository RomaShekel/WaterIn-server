import createHttpError from "http-errors";
import { ColumnsCollection } from "../db/model/columns.js";

export const getColumn = async (columnId) => {
    const column = await ColumnsCollection.findById(columnId)
    if(!column) throw createHttpError(404, "Column not found")
    return column;
}

export const getAllColumns = async (boardId) => {
    const allColumns = await ColumnsCollection.find({boardId})
    if(allColumns.length === 0) return [];
    if(!allColumns) throw createHttpError(404, "Columns not found");
    return allColumns;
}

export const createColumn = async (payload) => {
    const column = await ColumnsCollection.create(payload)
    if(!column) throw createHttpError(404, "Error while column creation");
    return column;
}

export const deleteColumn = async (columnId) => {
    const column = await ColumnsCollection.findByIdAndDelete(columnId);
    if(!column) throw createHttpError(404, "Column not found");
    return;
}

export const patchColumn = async (columnId, payload) => {
    const column = await ColumnsCollection.findByIdAndUpdate(columnId, payload, { new: true})
    if(!column) throw createHttpError(404, "Column not found")
    return column;
}