// 
// Interface for the trello board
// 
export interface ITrelloBoard {
    board_id: number
    board_name: string
}

// 
// Interface for the trello list
// 
export interface ITrelloList {
    list_id: number
    board_id: number
    list_name: string
}

// 
// interface for the trello card
// 
export interface ITrelloCard {
    card_id: number
    list_id: number
    board_id: number
    title: string
    description: string
}

// 
// Error msgs interface
// 
export interface IErrorMsgs {
    [key: string]: string
}