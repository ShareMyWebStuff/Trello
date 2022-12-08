# TrelloClone

A clone of Trello using React as the frontend, express as the backend. It stores data in a mysql database and is written in Typescript.

Clone the repo and setup a mySQL database.

Enter the database connection details in the .env.local file
Rename the .env.local file to .env

## Setup

Create mysql database and record the connection details

Clone this repositiry

Enter the database connection details into the .env.local file

Rename the .env.local file to .env

## Run the application

Start the backend

cd server
npm run dev

Start the front end
cd client
npm start

## Routes

GET /api/board/:boardId Retrieves a board with all the lists and acrds
POST /api/list Adds a list to a board

DELETE /api/list/:listId Deletes a list from a board

POST /api/card Adds a card to a list

PUT /api/card/:cardId Moves a card to a different list

DELETE /api/card/:cardId Deletes a card from a list

## Testing

### Frontend Testing

Has not been completed yet.

### Backend Tests

To test the backend, ruun the following
cd server
npm run test

## FrontEnd

![Trello clone](/TrelloClone.PNG)
