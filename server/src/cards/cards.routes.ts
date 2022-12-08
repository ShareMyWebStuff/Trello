import express, { Express, Request, Response } from 'express';
import {validListId} from '../lists/lists.validation'
import {checkListExistsByListId} from '../lists/lists.helper'
import {validCardId, validCardTitle, validCardDescription} from './cards.validation'
import {checkCardTitleExists, createCard, deleteCard, changeCardsList} from './cards.helper'
import {IErrorMsgs} from '../types/trello'

const router = express.Router()


// Create a card
// - listId
// - title
// - description
// 
router.post ('/', async (req, res) => {
    const errorMsgs: IErrorMsgs= {};
    let noErrors = 0;

    try {
        // Check body if an object
        if ( typeof req.body === 'object' && req.body !== null && !Array.isArray(req.body)) {

            const { listId, title, description, dueDate } = req.body;

            // Validate the list id
            if ( !validListId (listId)) {
                noErrors++;
                errorMsgs['listId'] = 'Please enter a valid list id.';
            }

            // Validate the card title
            if (!validCardTitle(title)) {
                noErrors++;
                errorMsgs['title'] = 'Please enter a valid title (2 - 50 characters).';
            }

            // Validate the card description
            if (!validCardDescription(description)) {
                noErrors++;
                errorMsgs['description'] = 'Please enter a valid description ( upto 1000 characters).';
            }

            // Check the list exists 
            if ( noErrors === 0 && !await checkListExistsByListId (listId)) {
                noErrors++;
                errorMsgs['listId'] = 'The list does not not exist. Please create.';
            }

            // Check the card title hasnt been created
            if ( noErrors === 0 && await checkCardTitleExists(listId, title)) {
                noErrors++;
                errorMsgs['title'] = 'The title already exists.';
            }

            // Create the card
            if ( noErrors === 0){
                const resp = await createCard (listId, 1, title, description)

                res.status(201).json(resp)
            } else {
                res.status(422).json({...errorMsgs})
            }

        } else {
            res.status(422).json({msg: 'Create card body is incorrectly formatted.' })
        }

    } catch (err) {
        res.status(500).json({msg: (err instanceof(Error)? err.message :'Server error creating a list.' ) })
    }

})


// 
// Moves a card to another list
// 
router.put ('/:cardId', async (req, res) => {

    const errorMsgs: IErrorMsgs= {};
    let noErrors = 0;

    try {
        if ( typeof req.body === 'object' && req.body !== null && !Array.isArray(req.body)) {
            const { toListId } = req.body;

            // Check the parameter query cardId is valid
            if ( !validCardId( req.params.cardId )) {
                noErrors++;
                errorMsgs['cardId'] = 'Please enter a valid card id as a .';
            }

            // validate the to list id
            if (!validListId(toListId)) {
                noErrors++;
                errorMsgs['toListId'] = 'Please enter a valid list id to move card to.';
            }

            // Update the cards list id
            if ( noErrors === 0) {
                const res = await changeCardsList(+req.params.cardId, toListId)
                if (res.affectedRows === 0) {
                    noErrors++;
                    errorMsgs['msg'] = 'The card could not be changed to the new list.';
                }
            }

            if ( noErrors === 0 ) {
                res.status(201).json({msg: `Changed cards list.` })
            } else {
                res.status(422).json({...errorMsgs})
            }

        } else {
            res.status(422).json({msg: 'Change cards list body is incorrectly formatted.' })
        }
    } catch (err) {
        res.status(500).json({msg: (err instanceof(Error)? err.message :'Server error changing a cards list.' ) })
    }

})


// 
// Delete a card from a list
// 
router.delete ('/:cardId', async (req, res) => {

    try {
        if ( !validCardId( req.params.cardId )) {
            res.status(422).json({listId: 'Parameter cardId does not contain a valid card id.' })
        } else {
            const del = await deleteCard(+req.params.cardId)
            res.status(200).json({msg: (del.affectedRows === 1? 'Card deleted.' : 'Card does not exist.')})
        }
    } catch (err) {
        res.status(500).json({msg: (err instanceof(Error)? err.message :'Server error deleting a cards.' ) })

    }

})

export default router;