import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// 
// Describes the board data we receive from the backend
// 
export interface BoardState {
  boardId: number | null
  boardName: string
  lists: {
    listId: number
    listName: string
    cards: {
      cardId: number
      title: string
      description: string
    }[]
  }[]
}

const initialState: BoardState = {
  boardId: null,
  boardName: '',
  lists: []
};

// 
// loadBoardDetails
// 
// This loads the board details along with the 
// 
export const loadBoardDetails = createAsyncThunk('board/getDetails',
  async (boardId: number) => {
    try {
      const boardDets = await axios<BoardState>({
        url: `api/board/${boardId}`,
        method: 'get',
        baseURL: 'http://127.0.0.1:3002',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
        data: JSON.stringify({}),
        validateStatus: function (status: number) {
          return true
        },
      })

      return (boardDets.data)

    } catch (err) {
      throw err
    }

  }
);


export const boardSlice = createSlice({
  name: 'board',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addList: (state, action: PayloadAction<{listId: number; listName: string}>) => {
      state.lists.push({ ...action.payload, cards: []});
    },
    addCard: (state, action: PayloadAction<{listId: number; cardId: number,  title: string, description: string}>) => {

      state.lists.forEach ( list => {
        if ( list.listId === action.payload.listId) {
          list.cards.push ({cardId: action.payload.cardId, title: action.payload.title, description: action.payload.description})
        }
      })

    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loadBoardDetails.fulfilled, (state, action) => {
        state.boardId = action.payload.boardId
        state.boardName = action.payload.boardName
        state.lists = JSON.parse(JSON.stringify(action.payload.lists)) 
      })
      .addCase(loadBoardDetails.rejected, (state) => {
        state.boardId = initialState.boardId
        state.boardName = initialState.boardName
        state.lists = []
      });

            
  },
});


export const { addList, addCard } = boardSlice.actions;

export default boardSlice.reducer;
