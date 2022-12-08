import React, {useState } from 'react'
import './TrelloCard.css'

interface ITrelloCardProps {
    cardId: number
    title: string
    description: string
}



export const TrelloCard: React.FC<ITrelloCardProps> = ({ cardId, title, description})  => {

    return (
        <div className='TrelloCard-container'>
            <span>{title}</span>
        </div>
    )
}
