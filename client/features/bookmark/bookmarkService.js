import axios from 'axios';

// API URL for bookmark-related endpoints
const API_URL = '/bookmarks/';

// Function to create a new bookmark
const createBookmark = async (bookmarkData, token) => {
  // Configuration for the request, including authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Send a POST request to create the bookmark
  const response = await axios.post(API_URL, bookmarkData, config);

  // Return the response data
  return response.data;
};

// Function to get user bookmarks
const getBookmarks = async (token) => {
  // Configuration for the request, including authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Send a GET request to retrieve user bookmarks
  const response = await axios.get(API_URL, config);

  // Return the response data
  return response.data;
};

// Function to delete a user bookmark
const deleteBookmark = async (bookmarkId, token) => {
  // Configuration for the request, including authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Send a DELETE request to remove the bookmark
  const response = await axios.delete(API_URL + bookmarkId, config);

  // Return the response data
  return response.data;
};

// Object containing bookmark service functions
const bookmarkService = {
  createBookmark,
  getBookmarks,
  deleteBookmark,
};

// Export the bookmarkService object
export default bookmarkService;
