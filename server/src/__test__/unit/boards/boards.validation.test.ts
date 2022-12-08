"use strict";
import {validBoardId} from '../../../boards/boards.validation'

// 
// Checks the boards validation functions
// 
describe('Check validBoardId', () => {

    it('Check board id is undefined', () => {
        const valid = validBoardId ( undefined)
        expect(valid).toBe(false)
    })

    it('Check board id is null', () => {
        const valid = validBoardId ( null)
        expect(valid).toBe(false)
    })

    it('Check board id is 0', () => {
        const valid = validBoardId ( 0)
        expect(valid).toBe(false)
    })

    it('Check board id is 10', () => {
        const valid = validBoardId ( 10)
        expect(valid).toBe(true)
    })

    it('Check board id is "10"', () => {
        const valid = validBoardId ( '10')
        expect(valid).toBe(true)
    })

})
