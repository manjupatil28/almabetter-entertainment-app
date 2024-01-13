const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Generate JWT
const generateToken = (id) => {
  const jwtSecret = 'HardcodedSecretKey';
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '30d',
  })
}

// @desc    Register New User
// @route   POST /user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // check if user exsists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User data!')
  }
})

// @desc    Authenticate User
// @route   POST /user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials!')
  }
})

// @desc    Validate User
// @route   GET /user
// @access  Private
const validateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(400)
    throw new Error('Invalid User!')
  }
})

module.exports = { registerUser, loginUser, validateUser }
