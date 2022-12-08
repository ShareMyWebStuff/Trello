import React from 'react'
import { TrelloCard } from '../TrelloCard'
import {TrelloAddCard} from '../TrelloAddCard'
import axios from 'axios'
import { useAppDispatch } from '../../app/hooks';
import {deleteList} from '../../features/board/boardSlice'
import './TrelloList.css'

interface ITrelloListProps {
    listId: number
    listName: string
    cards: {
        cardId: number
        title: string
        description: string
    }[]
}

// 
// Display the Trello list and loop through the cards
// 
export const TrelloList: React.FC<ITrelloListProps> = ({ listId, listName, cards})  => {

    const dispatch = useAppDispatch ();

    // Use axios to delete a list
    const deleteListById = async (listId: number)  => {
        try {

            const createList = await axios ({
                url: `api/list/${listId}`,
                method: 'delete',
                baseURL: 'http://127.0.0.1:3002',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
                data: JSON.stringify({}),
                validateStatus: function (status: number) {
                return true
                },
            })

            if ( createList.status === 200) {
                dispatch(deleteList( {listId} ))
            } else {
                alert ('Could not delete list.')
            }
        } catch (err) {
            console.log (err)    
        }

    }
    return (
        <div className='TrelloList-container'>
            <header className="list-header">{listName}<span onClick={ (e) => {e.preventDefault(); deleteListById(listId)}} className={(cards.length === 0 ? '' : 'list-delete-hide ') + `list-delete-btn`}>X</span></header>

            {
                cards.map ( card => {return <TrelloCard key={`${listId}-${card.cardId}`} cardId={card.cardId} title={card.title} description={card.description}/>})
            }
            <TrelloAddCard listId={listId}/>

        </div>
    )
}
