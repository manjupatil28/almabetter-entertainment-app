const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  validateUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/').get(protect, validateUser)

module.exports = router
