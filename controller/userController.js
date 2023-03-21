const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register User
// @route   POST /backend/user
// @access  Private
const setUser = asyncHandler(async (req, res) => {

  const {name, email, password, role} = req.body

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

  // Create User
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role: role
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
    })
  }else {
    res.status(400)
    throw new Error("Invalid User data")
  }

})

// @desc    Get user
// @route   GET /backend/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find() 

  res.status(200).json(user)
})

const getUserByEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.params.email) 

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
  setUser,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser
}