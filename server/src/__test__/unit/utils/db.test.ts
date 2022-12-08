"use strict";
import {getBoardsLists, } from '../../../boards/boards.helper'
import { dbPoolInit, runSQL, disconnect } from '../../../utils/db'

// 
// Checks the database throws an error if there is an issue. Connectivity will be tested in the other helper function tests.
// 
describe('No database', () => {

    dbPoolInit()

    it('Check database throws an error if its not connected.', async () => {

        try {
            const valid = await runSQL<{board_id: number}[]>(`SELECT board_id FROM trello_board WHERE board_name = ('Nothing')`, [])
            expect(true).toBe(false);
        } catch (err) {
            expect(err as string).toBe('Server error: database issue.');
        }

    })

})
