"use strict";
import {getBoardsLists } from '../../../boards/boards.helper'
import dotenv from 'dotenv';
dotenv.config();
import { dbPoolInit, runSQL, disconnect } from '../../../utils/db'

// 
// Check database throws am error if there is a connection issue
// 
describe('Check retrieval of a board', () => {

    const boardName = 'Unit Testing Board Retrieval';
    const boardNameNonExist = 'Unit Testing Board Retrieval Non Exist';
    const listName = 'Unit Test List 1'
    const cardName = 'Unit Test Card'

    let boardId: number;
    let nonExistBoardId: number;
    let listId: number;


    dbPoolInit()

    beforeAll ( async () => {

        // Check if test has been run and retrieve the boardId
        const prev = await runSQL<{board_id: number}[]>(`SELECT board_id FROM trello_board WHERE board_name = ('${boardName}')`, [])
        if ( prev.length === 1 ) {
            boardId = prev[0].board_id
        } else {
            const createBoard = await runSQL<{insertId: number}>(`INSERT INTO trello_board (board_name) VALUES ('${boardName}')`, [])
            boardId = createBoard.insertId
        }

        // Check there are no lists or cards for this board
        await runSQL<{affectedRows: number}>(`DELETE FROM trello_list WHERE board_id = ${boardId}`, [])
        await runSQL<{affectedRows: number}>(`DELETE FROM trello_card WHERE board_id = ${boardId}`, [])

        // Create and delete board so we have invalid board id
        await runSQL<{affectedRows: number}>(`DELETE FROM trello_board WHERE board_name = '${boardNameNonExist}'`, [])
        const invalidBoard = await runSQL<{insertId: number}>(`INSERT INTO trello_board (board_name) VALUES ('${boardNameNonExist}')`, [])
        nonExistBoardId = invalidBoard.insertId
        await runSQL<{affectedRows: number}>(`DELETE FROM trello_board WHERE board_name = '${boardNameNonExist}'`, [])

    })

    // 
    // Disconnect from the database connection pool
    // 
    afterAll( async () => {
        disconnect()
    })

    // 
    // Check non exists board throws an error
    // 
    it('Check thrown error if the board id does not exist', async () => {
        await expect(getBoardsLists(nonExistBoardId) ).rejects.toThrow(`Trello board (${nonExistBoardId}) does not exist.`);
    })

    // 
    // Check we retrieve a board with no lists
    // 
    it('Check board returned for existing board', async () => {
        const board = await getBoardsLists(boardId)

        expect(board).toEqual(expect.objectContaining({boardId, boardName, lists: [] }))
        expect(board.lists.length).toBe(0)
    })

    // 
    // Check we retrieve a board with a list
    // 
    describe('Add list to board', () => {

        beforeAll( async () => {
            const createList = await runSQL<{insertId: number}>(`INSERT INTO trello_list (board_id, list_name) VALUES ( ${boardId}, '${listName}')`, [])
            listId = createList.insertId
        })

        it('Check board contains list', async () => {
            const board = await getBoardsLists(boardId)
    
            expect(board).toEqual(expect.objectContaining({boardId, boardName }))
            expect(board.lists.length).toBe(1)
            expect(board.lists).toEqual(expect.arrayContaining([expect.objectContaining({listName})]))
        })

    })

    // 
    // Check we retrieve a list with a card
    // 
    describe('Add card to list', () => {

        beforeAll( async () => {
            const createCard = await runSQL<{insertId: number}>(`INSERT INTO trello_card (list_id, board_id, title, description) VALUES ( ${listId}, ${boardId},  '${cardName}', 'Description')`, []);
        })

        it('Check board list contains card', async () => {
            const board = await getBoardsLists(boardId)
    
            const list = board.lists.find( list => list.listName === listName)
            const card = (list ? list.cards.find(card => card.title === cardName) : undefined )
            expect(board).toEqual(expect.objectContaining({boardId, boardName }))
            expect(board.lists.length).toBe(1)
            expect(card).toBeDefined()
        })

    })

})
