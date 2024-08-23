import { model, Schema } from 'mongoose'

const columnSchema = new Schema(
  {
    userId: { type: String, ref: 'users'},
    boardId: { type: String, ref: 'boards'},
    name: { type: String, required: true},
    cards: { type: Array, ref: 'cards', default: []},
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const ColumnsCollection = model('columns', columnSchema)