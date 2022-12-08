import express from 'express';
import {validBoardId} from '../boards/boards.validation'
import {validListId, validListName} from './lists.validation'
import {checkListExists, createList, deleteList} from './lists.helper'

const router = express.Router()

interface IErrorMsgs {
    [key: string]: string
}


// Create a list
// - listName
// 
router.post ('/', async (req, res) => {
    const errorMsgs: IErrorMsgs= {};
    let noErrors = 0;

    try {
        // Check body if an object
        if ( typeof req.body === 'object' && req.body !== null && !Array.isArray(req.body)) {

            const { boardId, listName } = req.body;

            // Check boardId is valid
            if (!validBoardId(boardId)) {
                noErrors++;
                errorMsgs['boardId'] = 'Please enter a valid board id for the list to be added to.';
            }

            // Check listName is valid
            if (!validListName(listName) ) {
                noErrors++;
                errorMsgs['listName'] = 'Please enter a valid list name (4 - 50 character).'
            }

            // Check the list does not already exist
            if (noErrors === 0) {
                const listExists = await checkListExists ( boardId, listName )

                // Create list if it doesnt exist
                if (!listExists){
                    const list = await createList( boardId, listName )
                    res.status(201).json(list)
                } else {
                    res.status(422).json({listName: 'List already exists for the specified board.'})
                }
            } else {
                res.status(422).json({...errorMsgs})
            }

        } else {
            res.status(422).json({msg: 'Create list body is incorrectly formatted.' })
        }

    } catch (err) {
        res.status(500).json({msg: (err instanceof(Error)? err.message :'Server error creating a list.' ) })
    }

})

// 
// Delete a list by its id
// 
router.delete ('/:listId', async (req, res) => {


    try {
        if ( !validListId( req.params.listId )) {
            res.status(422).json({listId: 'Parameter listId does not contain a valid list id..' })
        } else {
            const del = await deleteList(+req.params.listId)
            res.status(200).json({msg: 'List does not exist.'})
        }
            
    } catch (err) {
        res.status(500).json({msg: (err instanceof(Error)? err.message :'Server error deleting a list.' ) })
    }

})

export default router;