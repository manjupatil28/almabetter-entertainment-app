const mongoose = require('mongoose');
const MovieModel = require('../models/MovieModel');
const data = require('../data.json');

// Function to connect to the MongoDB database, delete existing data, and insert new data
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided connection string
    const conn = await mongoose.connect("mongodb+srv://mpmanju9:cUMeVlG1AeDhiqoA@cluster0.xtasiys.mongodb.net/?retryWrites=true&w=majority");

    // Log a message if the connection is successful
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

    // Delete all existing documents in the MovieModel collection
    await MovieModel.deleteMany({});

    // Insert new data from the 'data.json' file into the MovieModel collection
    await MovieModel.insertMany(data);
  } catch (error) {
    // Log an error message if there's an issue with the database connection or data insertion
    console.log(error);
    process.exit(1); // Exit the process with an error code
  }
};

// Export the connectDB function to be used elsewhere in the application
module.exports = connectDB;
