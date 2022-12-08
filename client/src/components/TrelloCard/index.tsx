import React from 'react'
import axios from 'axios'
import { useAppDispatch } from '../../app/hooks';
import {deleteCard} from '../../features/board/boardSlice'
import './TrelloCard.css'

interface ITrelloCardProps {
    cardId: number
    title: string
    description: string
}

// 
// Display the 
// 
export const TrelloCard: React.FC<ITrelloCardProps> = ({ cardId, title, description})  => {

    const dispatch = useAppDispatch ();

    // Use axios to create the new list
    const deleteCardById = async (cardId: number)  => {
        try {

            const createList = await axios ({
                url: `api/card/${cardId}`,
                method: 'delete',
                baseURL: 'http://127.0.0.1:3002',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
                data: JSON.stringify({}),
                validateStatus: function (status: number) {
                return true
                },
            })

            if ( createList.status === 200) {
                dispatch(deleteCard( {cardId} ))
            } else {
                alert (createList.data.listName)
            }
        } catch (err) {
            console.log (err)    
        }

    }

    return (
        <div className='TrelloCard-container'>
            <span onClick={ (e) => {e.preventDefault(); deleteCardById(cardId)}} className="delete-btn">X</span>
            <span>{title}</span>
        </div>
    )
}
