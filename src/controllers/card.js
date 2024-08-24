import { 
    createCard,
    deleteCard,
    getBoardCards,
    getCard,
    getColumnCards,
    patchCard
} from "../services/card.js";


export const getCardController = async (req, res) => {
    const { cardId } = req.params;
    const card = await getCard(cardId);
    res.status(200).json({
        status:200,
        message: "Find a card",
        data: card
    })
}

export const getColumnCardsController = async (req, res) => {
    const { columnId } = req.params;
    const columnCards = await getColumnCards(columnId);
    let message = "Find column's cards";
    if(columnCards.length === 0) {
        message = "There are no column's cards";
    }
    res.status(200).json({
        status:200,
        message: message,
        data: columnCards
    })
}

export const getBoardCardsController = async (req, res) => {
    const { boardId } = req.params;
    const boardCards = await getBoardCards(boardId);
    let message = "Find board's cards";
    if(boardCards.length === 0) {
        message = "There are no board's cards!"
    }
    res.status(200).json({
        status:200,
        message: message,
        data: boardCards,
    });
};

export const createCardController = async (req, res) => {
    const payload = req.body;
    const userId = req.user._id;
    const card = await createCard({...payload, userId});
    res.status(201).json({
        status: 201,
        message: "Created a card!",
        data: card
    });
};

export const deleteCardController = async (req, res) => {
    const { cardId } = req.params;
    await deleteCard(cardId);
    res.status(204).send();
}

export const patchCardController = async (req, res) => {
    const { cardId } = req.params;
    const payload = req.body;
    const card = await patchCard(cardId, payload)
    res.status(202).json({
        status:202,
        message: "Updated the card",
        data: card
    })
}