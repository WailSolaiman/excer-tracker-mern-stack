const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI

mongoose.connect(process.env.MONGOLAB_PINK_URI || uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client', 'build')))

const exercisesRouter = require('./routes/exercises')
const userRouter = require('./routes/user')

app.use('/exercises', exercisesRouter)
app.use('/user', userRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
