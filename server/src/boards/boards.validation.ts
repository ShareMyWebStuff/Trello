// 
// Name:        validBoardId
// 
// Description: Returns true if the boardId is a valid number
// 
export const validBoardId = (boardId: any) => {
    if ( ( typeof boardId === 'string' && /\d/.test(boardId) && +boardId > 0 ) || (typeof boardId === 'number') && boardId > 0 ) {
        return true
    }
    return false
}