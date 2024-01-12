import express from 'express'
import devBundle from './devBundle'
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()
devBundle.compile(app)

import path from 'path'
const CURRENT_WORKING_DIR = process.cwd()
app.use('/public', express.static(path.join(CURRENT_WORKING_DIR, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

import template from './../template'

app.use('/user', require('./routes/userRoutes'))
app.use('/bookmarks', require('./routes/bookmarkRoutes'))

app.get('*', (req, res) => {
  res.status(200).send(template())
})

app.use(errorHandler)

let port = process.env.PORT || 3000
app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})
