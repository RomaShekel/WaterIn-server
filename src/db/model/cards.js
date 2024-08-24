import { model, Schema } from "mongoose";

const cardsSchema = new Schema(
    {
        userId: { type: String, ref: 'users'},
        columnId: { type: String, ref: 'columns'},
        boardId: { type: String, ref: 'boards'},
        name: { type: String, required: true},
        text: { type: String, required: true},
        priority: { 
            type: String, 
            enum: ['without', 'low', 'medium', 'high'],
            required: true
        },
        deadline: { type: Date, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const CardsCollection = model('cards', cardsSchema)