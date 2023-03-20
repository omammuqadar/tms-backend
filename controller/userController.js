const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

// @desc    Get user
// @route   GET /backend/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find() 

  res.status(200).json(user)
})

// @desc    Set user
// @route   POST /backend/user
// @access  Private
const setUser = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400)
    throw new Error("Please add User Name")
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email
  })

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
  getUser,
  setUser,
  updateUser,
  deleteUser
}