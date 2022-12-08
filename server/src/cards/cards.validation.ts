
// 
// Name:        validCardId
// 
// Description: Returns true if the listId is valid
// 
export const validCardId = (cardId: any) => {

    if ( ( typeof cardId === 'string' && /\d/.test(cardId) ) || (typeof cardId === 'number') && cardId > 0 ) {
        return true
    }
    return false
}


// 
// Name:        validCardTitle
// 
// Description: Returns true if the cardTitle is valid
//              Assumption - title can contain between 2 - 50 characters
// 
export const validCardTitle = (title: any) => {
    if ( typeof title === 'string' && title.length > 2 && title.length <= 50) {
        return true
    }
    return false
}

// 
// Name:        validCardDescription
// 
// Description: Returns true if the card description is valid
//              Assumption - description can contain upto 1000 characters
// 
export const validCardDescription = (description: any) => {
    if ( typeof description === 'string' && description.length <= 1000) {
        return true
    }
    return false
}



