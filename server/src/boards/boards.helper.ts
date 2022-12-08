import {runSQL} from '../utils/db'
import {ITrelloBoard, ITrelloList, ITrelloCard} from '../types/trello'

interface IBoardLists {
    boardId: number
    boardName: string
    lists: {
        listId: number
        listName: string
        cards: {
            cardId: number
            title: string
            description: string
        }[]
    } []
}

// 
// Name:        getBoardsLists
// 
// Description: Retrieves all the lists on a board and all the cards on the lists
// 
export const getBoardsLists = async (boardId: number) => {

    try {
        const boardList: Partial<IBoardLists> = {}

        const boards = await runSQL<ITrelloBoard[]>(`SELECT * FROM trello_board WHERE board_id = ${boardId};`, [])
        const lists = await runSQL<ITrelloList[]>(`SELECT * FROM trello_list WHERE board_id = ${boardId};`, [])
        const cards = await runSQL<ITrelloCard[]>(`SELECT * FROM trello_card WHERE board_id = ${boardId};`, [])

        if (boards.length === 1){
            boardList.boardId = boards[0].board_id
            boardList.boardName = boards[0].board_name
            boardList.lists= []
        } else {
            throw new Error(`Trello board (${boardId}) does not exist.`)
        }

        if (lists.length > 0) {

            // for each list
            for ( const list of lists ) {

                // Find the cards for the list
                const listsCards = cards.filter( card => card.list_id === list.list_id).map( card => { return {cardId: card.card_id, title: card.title, description: card.description}})

                boardList.lists.push({
                    listId: list.list_id,
                    listName: list.list_name,
                    cards: listsCards
                })
            }
        }

        return ( boardList as IBoardLists)
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error checking if board exists.')
    }
}
