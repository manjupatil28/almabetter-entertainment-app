const asyncHandler = require('express-async-handler')

const Bookmark = require('../models/bookmarkModel')
const User = require('../models/userModel')

// @desc    Get Bookmarks
// @route   GET /bookmarks
// @access  Private
const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user.id })

  res.status(200).json(bookmarks)
})

// @desc    Set Bookmard
// @route   POST /bookmarks
// @access  Private
const setBookmark = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a bookmark')
  }

  const bookmarkExists = await Bookmark.findOne({
    userId: req.user.id,
    title: req.body.title,
  })

  if (bookmarkExists) {
    res.status(400)
    throw new Error('This show is already bookmarked')
  }

  const bookmark = await Bookmark.create({
    title: req.body.title,
    userId: req.user.id,
  })

  res.status(200).json(bookmark)
})

// @desc    Delete Bookmark
// @route   Delete /bookmark/:id
// @access  Private
const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id)

  if (!bookmark) {
    res.status(400)
    throw new Error('Bookmark not found')
  }

  const user = await User.findById(req.user.id)

  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // make sure the logged in user matches the goal user
  if (bookmark.userId.toString() !== user.id) {
    res.status(401)
    throw new Error('user not authorized')
  }

  await bookmark.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = { getBookmarks, setBookmark, deleteBookmark }
