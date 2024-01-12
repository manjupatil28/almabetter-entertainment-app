const express = require('express')
const router = express.Router()

const {
  getBookmarks,
  setBookmark,
  deleteBookmark,
} = require('../controllers/bookmarkController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getBookmarks).post(protect, setBookmark)
router.route('/:id').delete(protect, deleteBookmark)

module.exports = router
