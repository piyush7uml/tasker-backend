
//INITIALIZING DOTENV
import dotenv from 'dotenv';
dotenv.config()

//INITIALIZING EXPRESS
import express from 'express';

const app = express();
import colors from 'colors';

//BODY PARSER
app.use(express.json());

// CORS
import cors from 'cors';
app.use(cors());

//DATABASE CONNECTION
import connectDb from './utils/dbConnection.js'
connectDb()

//IMPORTING ROUTES
import userRoutes from './Routes/userRoutes.js';
import todoRoutes from './Routes/todoRoutes.js'

app.use("/api/user", userRoutes)
app.use("/api/todo", todoRoutes)

//ERROR HANDLER
import { notFound, expressErrorHandler } from './utils/errorHandler.js';

app.use(notFound)

app.use(expressErrorHandler)

// STARTING SERVER
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App is Running at port ${PORT}`.green)
})