# Trello

A clone of Trello using React as the frontend, express as the backend. The darta is persisted in a mySQL database and the project is written in Typescript.

Clone the repo and setup a mySQL database.

Enter the database connection details in the .env.local file
Rename the .env.local file to .env

## Setup

1. Create a mySQL database
2. Create the tables listed below **listed below**
3. Insert the board we use **listed below**
4. Clone the repository
5. Install packages **listed below**
6. Setup .env **listed below**

### Create Tables

    DROP TABLE IF EXISTS trello_board
    CREATE TABLE IF NOT EXISTS trello_board (
        board_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
        board_name VARCHAR(50) NOT NULL,
        PRIMARY KEY ( board_id )
    );

    DROP TABLE IF EXISTS trello_list
        CREATE TABLE IF NOT EXISTS trello_list (
        list_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
        board_id INTEGER UNSIGNED NOT NULL,
        list_name VARCHAR(50) NOT NULL,
        PRIMARY KEY ( list_id )
    );

    DROP TABLE IF EXISTS trello_card
    CREATE TABLE IF NOT EXISTS trello_card (
        card_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
        list_id INTEGER UNSIGNED NOT NULL,
        board_id INTEGER UNSIGNED NOT NULL,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        PRIMARY KEY ( card_id )
    );

### Create Board

    INSERT INTO trello_board ( board_id, board_name ) VALUES ( 1, 'Trello Board');

### Install Packages

For the server

1. cd server
2. npm install
3. npm run build

For the client

1. cd client
2. npm install

### Setup .env

From the server directory

## Run Tests

Currently there are no tests for the frontend.

Running the server tests is performed from the server directory, run the following

    npm run test

## Run Project

From the server directory run
npm run dev

From the client directory run
npm start

## Run the application

Start the backend

cd server
npm run dev

Start the front end
cd client
npm start

## Backend Routes

GET /api/board/:boardId Retrieves a board with all the lists and acrds
POST /api/list Adds a list to a board

DELETE /api/list/:listId Deletes a list from a board

POST /api/card Adds a card to a list

PUT /api/card/:cardId Moves a card to a different list

DELETE /api/card/:cardId Deletes a card from a list

## FrontEnd

![Trello clone](/TrelloClone.PNG)
