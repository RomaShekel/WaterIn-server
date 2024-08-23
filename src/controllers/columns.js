import { createColumn, deleteColumn, getAllColumns, getColumn, patchColumn } from "../services/columns.js"


export const getColumnController = async (req, res) => {
    const { columnId } = req.params
    const column = await getColumn(columnId)
    
    res.status(200).json({
        status: 200,
        message: "Column founded",
        data: column
    })
}

export const getAllColumnsController = async (req, res) => {
    const { boardId } = req.params;
    const allColumns = await getAllColumns(boardId)
    res.status(200).json({
        status:200,
        message:"Columns from the board are founded",
        data: allColumns
    })
}

export const createColumnController = async (req, res) => {
    const { boardId } = req.params;
    const userId = req.user._id;
    const payload = req.body;

    const column = await createColumn({...payload, boardId, userId});

    res.status(201).json({
        status:201,
        message:"Created a column",
        data: column
    })
}

export const deleteColumnController = async (req, res) => {
    const { columnId } = req.params;
    await deleteColumn(columnId);

    res.status(204).send();
}

export const patchColumnController = async (req, res) => {
    const { columnId } = req.params;
    const payload = req.body
    const column = await patchColumn(columnId, payload);
    res.status(202).json({
        status:202,
        message:"Patched the column",
        data: column
    })
}