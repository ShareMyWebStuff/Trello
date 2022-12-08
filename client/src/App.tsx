import React, {useEffect} from 'react';
import {loadBoardDetails} from './features/board/boardSlice'
import { useAppSelector, useAppDispatch } from './app/hooks';
import {RootState} from './app/store';
import './App.css';
import TrelloAddList from './components/TrelloAddList';
import {TrelloList} from './components/TrelloList';

function App() {
  const boardState = useAppSelector( (state: RootState) => state.board)
  const dispatch = useAppDispatch ();

  // 
  // Call an action to load the board
  // 
  useEffect ( () => {
    dispatch(loadBoardDetails(1))
  }, [dispatch])


  return (
    <div className="App">
      <header className='board-header'>Board: {boardState.boardName}</header>
      <main>

        {
          boardState.lists.map( list => {return <TrelloList key={list.listId} listId={list.listId} listName={list.listName} cards={list.cards} /> })
        }
        
        <TrelloAddList />
      </main>
    </div>
  );
}

export default App;
