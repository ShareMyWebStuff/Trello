"use strict";
import request from 'supertest'
import dotenv from 'dotenv';
dotenv.config();
import { dbPoolInit, runSQL, disconnect } from '../../../utils/db'
import app from '../../../app'

// 
// Integration test - check we call the express routes
// 
describe('Check retrieval of a board', () => {

    const boardName = 'Integration Testing Board Retrieval';
    const boardNameNonExist = 'Unit Testing Board Retrieval Non Exist';

    let boardId: number;
    let nonExistBoardId: number;

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

    // Check an error is retrieved if we try to display an invalid board
    describe ( 'Invalid board id', () => {

        it( 'Retrieve board', async () => {
            const res = await request(app).get('/api/board/abc')

            expect.objectContaining({msg: 'Please enter a valid board id.'})
        })

    })

    // Check we can retieve an existing board
    describe ( 'Valid board id', () => {

        it( 'Retrieve board', async () => {
            const res = await request(app).get(`/api/board/${boardId}`)

            expect.objectContaining({boardId, boardName})
        })

    })

})
