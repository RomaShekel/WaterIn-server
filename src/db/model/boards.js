import  {model, Schema } from 'mongoose'

const boardSchema = new Schema(
    {
        userId: { type: String, ref: 'users'},
        name: { type: String, required: true, unique: true },
        icon: { type: Number, default: 1 },
        columns: { type: Array, ref: 'columns', default: [] },
        image: { type: String, default: null }
    },
    {
        timestamps:true,
        versionKey: false,
    }
)

export const BoardsCollection = model('boards', boardSchema)