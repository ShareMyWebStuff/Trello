"use strict";
import {validListName, validListId} from '../../../lists/lists.validation'


describe('Check list validation', () => {

    describe('Check list id valiation', () => {

        it('Fails if undefined', () => {
            const valid = validListId ( undefined)
            expect(valid).toBe(false)
        })
    
        it('Fails if null', () => {
            const valid = validListId ( null)
            expect(valid).toBe(false)
        })
    
        it('Fails if boolean', () => {
            const valid = validListId ( true )
            expect(valid).toBe(false)
        })
    
        it('Fails if 0', () => {
            const valid = validListId ( 0)
            expect(valid).toBe(false)
        })
    
        it('Success if numeric greater than 0', () => {
            const valid = validListId ( 20)
            expect(valid).toBe(true)
        })
    
        it('Success if numeric string', () => {
            const valid = validListId ( "30")
            expect(valid).toBe(true)
        })
    
    })
    


    describe('Check list name valiation', () => {

        it('Fails if undefined', () => {
            const valid = validListName ( undefined)
            expect(valid).toBe(false)
        })
    
        it('Fails if null', () => {
            const valid = validListName ( null)
            expect(valid).toBe(false)
        })
    
        it('Fails if boolean', () => {
            const valid = validListName ( true )
            expect(valid).toBe(false)
        })
    
        it('Fails if 0', () => {
            const valid = validListName ( 0)
            expect(valid).toBe(false)
        })
    
        it('Fails if list name is empty', () => {
            const valid = validListName ( '')
            expect(valid).toBe(false)
        })
    
        it('Fails if list name is too long', () => {
            const valid = validListName ( 'a'.repeat(51))
            expect(valid).toBe(false)
        })
    
        it('Success if list name', () => {
            const valid = validListName ( 'List name')
            expect(valid).toBe(true)
        })
    
    })
    

})
