import createHttpError from "http-errors";
import { 
    createBoard,
    deleteBoard,
    patchBoard,
    getUsersBoards,
    getBoard,
} from "../services/boards.js";

export const getUsersBoardsController = async (req, res, next) => {
    
    const userId = req.user._id;
    const boards = await getUsersBoards(userId)
    if(!boards) next(createHttpError(404, 'Boards not found'))

    res.status(200).json({
        status: 200,
        message: "User's board founded",
        data: boards
    })
}

export const getBoardController = async (req, res, next) => {
    const { boardId } = req.params;
    const board = await getBoard(boardId);
    if(!board) next(createHttpError(404, "Board not found"))

    res.status(200).json({
        status: 200,
        message: "Found the board",
        date: board
    })
}

export const createBoardController = async (req, res, next) => {
    const payload = req.body;
    const userId = req.user._id;
    const board = await createBoard({...payload, userId})

    if(!board) {
        next(createHttpError(500, "Board wasn't created cause server error"))
    }

    res.status(200).json({
        status: 200,
        message: 'Board was created',
        data: board
    })
}

export const deleteBoardController = async (req, res, next) => {
    const { boardId } = req.params;

    const board = await deleteBoard(boardId)

    if(!board) {
        next(createHttpError(404, 'Board not found'))
    }

    res.status(204).send()
}

export const patchBoardController = async (req, res, next) => {
    const payload = req.body;
    const { boardId } = req.params

    const board = await patchBoard(boardId, payload)
    if(!board) {
        next(createHttpError(404, 'Board not found'))
    }

    res.status(201).json({
        status: 201,
        message: 'Board was updated',
        data: board
    })
}