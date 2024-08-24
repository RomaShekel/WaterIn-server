import createHttpError from "http-errors";
import { CardsCollection } from "../db/model/cards.js";

export const getCard = async (cardId) => {
    const card = await CardsCollection.findById(cardId);
    if(!card) throw createHttpError(404, "Card not found")
    return card;
}

export const getColumnCards = async (columnId) => {
    const columnCards = await CardsCollection.find({columnId})
    if (!columnCards) throw createHttpError(500, "Error while column's card search!")
    return columnCards
}

export const getBoardCards = async (boardId) => {
    const boardCards = await CardsCollection.find({boardId});
    if(!boardCards) throw createHttpError(500, "Error while board's card search");
    return boardCards;
}

export const createCard = async (payload) => {
    const card = await CardsCollection.create(payload);
    if(!card) throw createHttpError(500, "Server error while creating card!")
    return card;
}

export const deleteCard = async (cardId) => {
    const card = await CardsCollection.findByIdAndDelete(cardId);
    if(!card) throw createHttpError(404, "Card not found")
    return
}

export const patchCard = async (cardId, payload) => {
    const card = CardsCollection.findByIdAndUpdate(cardId, payload, { new: true });
    if(!card) throw createHttpError(404, "Card not found");
    return card;
}