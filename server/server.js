// Import required modules and libraries
import express from 'express';
import devBundle from './devBundle';
const colors = require('colors'); // Assuming 'colors' library is used for colorful console logs
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to the MongoDB database
connectDB();

// Create an Express application
const app = express();

// Set up Webpack middleware for development
devBundle.compile(app);

// Set up serving static files from the 'public' directory
import path from 'path';
const CURRENT_WORKING_DIR = process.cwd();
app.use('/public', express.static(path.join(CURRENT_WORKING_DIR, 'public')));

// Set up middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import template for rendering HTML
import template from './../template';

// Set up routes for user and bookmarks using corresponding route files
app.use('/user', require('./routes/userRoutes'));
app.use('/bookmarks', require('./routes/bookmarkRoutes'));

// Handle wildcard route to render HTML template for any other routes
app.get('*', (req, res) => {
  res.status(200).send(template());
});

// Use error handling middleware
app.use(errorHandler);

// Set the port for the server
let port = process.env.PORT || 3000;

// Start the Express server on the specified port
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', port);
});
