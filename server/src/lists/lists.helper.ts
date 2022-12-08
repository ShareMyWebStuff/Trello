import {runSQL} from '../utils/db'
import {ITrelloList} from '../types/trello'


// 
// Name:        checkListExistsByListId
// 
// Description: Returns true if the list exists
// 
export const checkListExistsByListId = async (listId: number) => {

    try {
        const res = await runSQL<ITrelloList[]>(`SELECT * FROM trello_list WHERE list_id = ${listId};`, [])

        return ( res.length > 0)
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error checking if list exists.')
    }

}


// 
// Name:        checkListExists
// 
// Description: Returns true if the list on the board already exists
// 
export const checkListExists = async (boardId: number, listName: string) => {

    try {
        const res = await runSQL<ITrelloList[]>(`SELECT * FROM trello_list WHERE board_id = ${boardId} AND list_name = '${listName}';`, [])

        return ( res.length > 0)
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error checking if list exists.')
    }

}

// 
// Name:        createList
// 
// Description: Creates the list
// 
export const createList = async (boardId: number, listName: string) => {

    try {
        const sql = `INSERT INTO trello_list (board_id, list_name) VALUES ( ${boardId}, '${listName}');`
        const res = await runSQL<{insertId: number}>(sql, [])

        return {listId: res.insertId, listName: listName}
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error creating list.')
    }

}

// 
// Name:        deleteList
// 
// Description: Deletes a list
// 
export const deleteList = async (listId: number) => {

    try {
        const res = await runSQL<{affectedRows: number}>(`DELETE FROM trello_list WHERE list_id = ${listId};`, [])

        return res
    } catch (err) {
        if (err instanceof(Error)) {
            throw err
        }
        throw new Error ('Error deleting list.')
    }

}
