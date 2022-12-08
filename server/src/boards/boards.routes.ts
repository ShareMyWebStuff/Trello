import express from 'express';
import {validBoardId} from './boards.validation'
import {getBoardsLists} from './boards.helper'

const router = express.Router()

interface IErrorMsgs {
    [key: string]: string
}

// Retrieve a boards lists
router.get ('/:boardId', async (req, res) => {
    const errorMsgs: IErrorMsgs= {};
    let noErrors = 0;

    try {

        const { boardId } = req.params;
        // Validate the list id
        if ( !validBoardId (boardId)) {
            noErrors++;
            errorMsgs['boardId'] = 'Please enter a valid board id.';
        }
        
        if ( noErrors === 0) {
            const board = await getBoardsLists (+boardId)
            res.status(200).json(board)
        } else {
            res.status(422).json({...errorMsgs})  
        }

    } catch (err) {
        res.status(500).json({msg: (err instanceof(Error)? err.message :'Error checking if board exists.' ) })
    }
})

export default router;