import React, {useState } from 'react'
import { TrelloCard } from '../TrelloCard'
import {TrelloAddCard} from '../TrelloAddCard'
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

    return (
        <div className='TrelloList-container'>
            <header>{listName}</header>

            {
                cards.map ( card => {return <TrelloCard key={`${listId}-${card.cardId}`} cardId={card.cardId} title={card.title} description={card.description}/>})
            }
            <TrelloAddCard listId={listId}/>

        </div>
    )
}
