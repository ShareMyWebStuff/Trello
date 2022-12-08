import { useState } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../../app/hooks';
import {addCard} from '../../features/board/boardSlice'
import './TrelloAddCard.css'



export const TrelloAddCard: React.FC<{listId: number}> = ( {listId}) => {

    const dispatch = useAppDispatch ();
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [cardName, setCardName] = useState('')

    const saveList = async ()  => {
        try {

            if (cardName.length === 0 ) {
                alert('Please enter a valid card name')
                return
            }
            const createCard = await axios ({
                url: `api/card`,
                method: 'post',
                baseURL: 'http://127.0.0.1:3002',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
                data: JSON.stringify({listId, title: cardName, description: ''}),
                validateStatus: function (status: number) {
                return true
                },
            })
            console.log (createCard)

            if ( createCard.status === 201) {
                dispatch(addCard( {listId, cardId: createCard.data.cardId, title: cardName, description: '' }) )

                setIsFocused(false)
                setCardName('')
            } else {
                alert (createCard.data.listName)
            }
        } catch (err) {
            console.log (err)    
        }

    }


    return (<div  onClick={()=> {setIsFocused(true)}} className="TrelloAddCard-container" data-test="addList">
        <form>
            { isFocused ? <div>
                <input autoFocus type="text" value={cardName} onChange={(e) =>setCardName (e.target.value)} ></input>
            <div className=''>
                <button onClick={(e) => {e.preventDefault(); saveList()}} >Add card</button>
                <button onClick={(e) => {e.stopPropagation(); setIsFocused(false)}}  className=''>Cancel</button>
            </div>
            </div>:
            <span>+ Add a card</span>}
        </form>
    </div>)

}