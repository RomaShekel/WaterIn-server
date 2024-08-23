import createHttpError from "http-errors";
import { BoardsCollection } from "../db/model/boards.js";

export const getUsersBoards = async (userId) => {
    const boards = await BoardsCollection.find({ userId })
    if(boards.length === 0) return []
    if(!boards) {
      throw  createHttpError(500, "Server error, user's boards not found")
    }
    return boards;
}

export const getBoard = async (boardId) => {
    const board = await BoardsCollection.findById(boardId);
    if(!board) throw createHttpError(404, "Board not found");

    return board;
}

export const createBoard = async (payload) => {
    const boardName = await BoardsCollection.findOne({name:payload.name})
    if(boardName) throw createHttpError(409, "Board name mast be unique!")
        
    const board = await BoardsCollection.create(payload);
    return board;
}

export const deleteBoard = async (boardId) => {
    const board = await BoardsCollection.findByIdAndDelete(boardId);
    if (!board) {
        throw createHttpError(404, 'Board not found')
    }
    return board;
}

export const patchBoard = async (boardId, payload) => {
    const board = await BoardsCollection.findByIdAndUpdate(boardId, payload, { new: true });
    if (!board) {
        throw createHttpError(404, 'Board not found')
    }
    return board;
}