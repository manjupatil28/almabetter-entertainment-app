const mongoose = require('mongoose')
const MovieModel = require('../models/MovieModel')
const data = require('../data.json')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://mpmanju9:cUMeVlG1AeDhiqoA@cluster0.xtasiys.mongodb.net/?retryWrites=true&w=majority")

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    await MovieModel.deleteMany({})
    await MovieModel.insertMany(data)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
