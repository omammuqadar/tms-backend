const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors');

connectDB()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
  origin: 'http://localhost:3000'
}));
// ____

app.use('/backend/user', require('./routes/userRoutes'))
app.use('/backend/program', require('./routes/programRoutes'))
app.use('/backend/session', require('./routes/sessionRoutes'))
app.use('/backend/assignment', require('./routes/assignmentRoutes'))
app.use('/backend/feedback', require('./routes/feedbackRoutes'))
app.use('/backend/videos', require('./routes/videoRoutes'))
app.use('/backend/updates', require('./routes/updateRoutes'))
app.use('/backend/reports', require('./routes/reportRoutes'))

app.use(errorHandler)

app.listen(port,() => console.log(`working ${port}`))