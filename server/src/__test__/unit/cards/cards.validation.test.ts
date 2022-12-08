"use strict";
import {validCardId, validCardTitle, validCardDescription } from   '../../../cards/cards.validation'

describe('Check card validation functions', () => {

    // 
    // validCardId
    // 
    describe ( 'Check card id validation', () => {

        it('Fails if undefined', () => {
            const valid = validCardId ( undefined)
            expect(valid).toBe(false)
        })
    
        it('Fails if null', () => {
            const valid = validCardId ( null)
            expect(valid).toBe(false)
        })
    
        it('Fails if boolean', () => {
            const valid = validCardId ( true)
            expect(valid).toBe(false)
        })
    
        it('Fails if 0', () => {
            const valid = validCardId ( 0)
            expect(valid).toBe(false)
        })
    
        it('Fails if 10', () => {
            const valid = validCardId ( 10)
            expect(valid).toBe(true)
        })
    
        it('Fails if "10"', () => {
            const valid = validCardId ( '10')
            expect(valid).toBe(true)
        })

    })

    // 
    // validCardTitle
    // 
    describe ( 'Check card id validation', () => {

        it('Fails if undefined', () => {
            const valid = validCardTitle ( undefined)
            expect(valid).toBe(false)
        })
    
        it('Fails if null', () => {
            const valid = validCardTitle ( null)
            expect(valid).toBe(false)
        })
    
        it('Fails if boolean', () => {
            const valid = validCardTitle ( false)
            expect(valid).toBe(false)
        })
    
        it('Fails if numeric', () => {
            const valid = validCardTitle ( 10)
            expect(valid).toBe(false)
        })
    
        it('Fails if blank string', () => {
            const valid = validCardTitle ( '')
            expect(valid).toBe(false)
        })
    
        it('fails if longer than 50 characters', () => {
            const valid = validCardTitle ( 'a'.repeat(51))
            expect(valid).toBe(false)
        })
    
        it('Successful if string and between 1 - 50 characters', () => {
            const valid = validCardTitle ( 'Title')
            expect(valid).toBe(true)
        })
    

    })

    // 
    // validCardDescription
    // 
    describe ( 'Check card description validation', () => {

        it('Fails if undefined', () => {
            const valid = validCardDescription ( undefined)
            expect(valid).toBe(false)
        })
    
        it('Fails if null', () => {
            const valid = validCardDescription ( null)
            expect(valid).toBe(false)
        })
    
        it('Fails if boolean', () => {
            const valid = validCardDescription ( false)
            expect(valid).toBe(false)
        })
    
        it('Fails if 0', () => {
            const valid = validCardDescription ( 10)
            expect(valid).toBe(false)
        })
    
        it('Fails if 10', () => {
            const valid = validCardDescription ( '')
            expect(valid).toBe(true)
        })
    
        it('Fails if "10"', () => {
            const valid = validCardDescription ( 'Description')
            expect(valid).toBe(true)
        })

    })

})
