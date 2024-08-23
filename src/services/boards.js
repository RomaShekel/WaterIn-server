import createHttpError from "http-errors";
import { BoardsCollection } from "../db/model/boards.js";

export const getUsersBoards = async (userId) => {
    const boards = await BoardsCollection.find({ userId })
    if(boards.length === 0) return []
    if(!boards) {
        createHttpError(500, "Server error, user's boards not found")
    }
    return boards;
}

export const getBoard = async (boardId) => {
    const board = await BoardsCollection.findById(boardId);
    if(!board) createHttpError(404, "Board not found");

    return board;
}

export const createBoard = async (payload) => {
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