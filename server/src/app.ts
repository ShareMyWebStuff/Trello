// import express, { Express, Request, Response } from 'express';
import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { dbPoolInit } from './utils/db'
// import listRoutes from '@lists/lists.routes'
import listRoutes from './lists/lists.routes'
import cardRoutes from './cards/cards.routes'
import boardRoutes from './boards/boards.routes'

const app: Express = express();

// 
// Create the database connection pool. If there is an error kill the process
// 
try {
  dbPoolInit()
} catch (err) {
  console.log ('Error creating the database connection pool')
  process.exit()
}

// Middleware - decipher the event body
app.use(express.json())

app.use(cors())

// // Log the route
// app.use( (req, res, next) => {
//     console.log (req.path, req.method)
//     next()
// })

// Routes
app.use('/api/list', listRoutes)
app.use('/api/card', cardRoutes)
app.use('/api/board', boardRoutes)

export default app;
