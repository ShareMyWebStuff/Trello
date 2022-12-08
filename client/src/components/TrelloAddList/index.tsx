import { useState } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../../app/hooks';
import {addList} from '../../features/board/boardSlice'
import './TrelloAddList.css'

export default function TrelloAddList ( {}) {

    const dispatch = useAppDispatch ();
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [listName, setListName] = useState('')

    // Use axios to create the new list
    const saveList = async ()  => {
        try {

            if (listName.length === 0 ) {
                alert('Please enter a valid list name')
                return
            }
            const createList = await axios ({
                url: `api/list`,
                method: 'post',
                baseURL: 'http://127.0.0.1:3002',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
                data: JSON.stringify({boardId: 1, listName}),
                validateStatus: function (status: number) {
                return true
                },
            })

            if ( createList.status === 201) {
                dispatch(addList(createList.data))

                setIsFocused(false)
                setListName('')
            } else {
                alert (createList.data.listName)
            }
        } catch (err) {
            console.log (err)    
        }

    }


    return (<div  onClick={()=> {setIsFocused(true)}} className="TrelloAddList-container" data-test="addList">
        <form>
            { isFocused ? <div><input autoFocus type="text" value={listName} onChange={(e) =>setListName (e.target.value)} ></input>
            <div className=''>
                <button onClick={(e) => {e.preventDefault(); saveList()}} >Add list</button>
                <button onClick={(e) => {e.stopPropagation(); setIsFocused(false)}}  className=''>Cancel</button>
            </div>
            </div>:
            <span>+ Add another list</span>}
        </form>
    </div>)

}