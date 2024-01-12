import axios from 'axios'

const API_URL = '/bookmarks/'

// Create New Bookmark
const createBookmark = async (bookmarkData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, bookmarkData, config)

  return response.data
}

// Get user Bookmarks
const getBookmarks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete User Bookmark
const deleteBookmark = async (bookmarkId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + bookmarkId, config)

  return response.data
}

const bookmarkService = {
  createBookmark,
  getBookmarks,
  deleteBookmark,
}

export default bookmarkService
