const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// ____

app.use('/backend/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port,() => console.log(`working ${port}`))