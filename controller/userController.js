const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register User
// @route   POST /backend/user
// @access  Private
const registerUser = asyncHandler(async (req, res) => {

  const {name, email, password} = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error("Please add All Fields")
  }

  // Check User if Exists
  const userExists = await User.findOne({email})
  if(userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }else {
    res.status(400)
    throw new Error("Invalid User data")
  }

})

// @desc    Authenticate a user
// @route   POST /backend/user/login
// @access  Private
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body 

  // Check for user email
  const user = await User.findOne({email}) 

  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  }else {
    res.status(400)
    throw new Error("Invalid Credentials")
  }

})

// @desc    Get user
// @route   GET /backend/user
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Get user
// @route   GET /backend/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find() 

  res.status(200).json(user)
})

// @desc    Update user
// @route   PUT /backend/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(!user) {
    res.status(400)
    throw new Error("User Not Found")
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedUser)
})

// @desc    Delete user
// @route   DELETE /backend/user/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(!user) {
    res.status(400)
    throw new Error("User Not Found")
  }

  await user.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUser,
  updateUser,
  deleteUser
}