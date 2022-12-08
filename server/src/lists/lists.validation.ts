
// 
// Name:        validListName
// 
// Description: Returns true if the listName is valid
// 
export const validListName = (listName: any) => {
    if ( typeof listName === 'string' && listName.length > 2 && listName.length <= 50) {
        return true
    }
    return false
}

// 
// Name:        validListId
// 
// Description: Returns true if the listId is valid
// 
export const validListId = (listId: any) => {
    if ( ( typeof listId === 'string' && /\d/.test(listId) ) || (typeof listId === 'number') && listId > 0 ) {
        return true
    }
    return false
}

