import {runSQL} from '../utils/db'

interface ITrelloCard {
    card_id: number
    list_id: number
    board_id: number
    title: string
    description: string
}


// 
// Name:        checkCardTitleExists
// 
// Description: Returns true if the card title already exists in the list
// 
export const checkCardTitleExists = async (listId: number, cardTitle: string) => {

    try {
        const res = await runSQL<ITrelloCard[]>(`SELECT * FROM trello_card WHERE list_id = ${listId} AND title = '${cardTitle}';`, [])

        return ( res.length > 0)
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error checking if card exists.')
    }

}

// 
// Name:        createCard
// 
// Description: Creates the card in a list
// 
export const createCard = async (listId: number, boardId: number, title: string, description: string) => {

    try {
        const sql = `INSERT INTO trello_card (list_id, board_id, title, description) VALUES ( ${listId}, ${boardId}, '${title}', '${description}');`
        const res = await runSQL<{affectedRows: number}>(sql, [])

        return res
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error creating card.')
    }

}

// 
// Name:        changeCardsList
// 
// Description: Changes the cards list
// 
export const changeCardsList = async (cardId: number, toListId: number) => {

    try {
        const res = await runSQL<{affectedRows: number}>(`UPDATE trello_card SET list_id = ${toListId} WHERE card_id = ${cardId} AND EXISTS (SELECT * FROM trello_list WHERE list_id = ${toListId})`, [])
        return res
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error changing cards list.')
    }

}

// 
// Name:        deleteCard
// 
// Description: Deletes a card from a list
// 
export const deleteCard = async (cardId: number) => {

    try {
        const res = await runSQL<{affectedRows: number}>(`DELETE FROM trello_card WHERE card_id = ${cardId};`, [])

        return res
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error deleting card.')
    }
}

