const asyncHandler = require('express-async-handler')

// @desc    Get user
// @route   GET /backend/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({message:"Get User"})
})

// @desc    Set user
// @route   POST /backend/user
// @access  Private
const setUser = asyncHandler(async (req, res) => {
  if(!req.body.user) {
    res.status(400)
    throw new Error("Please add User Name")
  }
  res.status(200).json({message:"Set User"})
})

// @desc    Update user
// @route   PUT /backend/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({message:`Update User ${req.params.id}`})
})

// @desc    Delete user
// @route   DELETE /backend/user/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({message:`Delete User ${req.params.id}`})
})

module.exports = {
  getUser,
  setUser,
  updateUser,
  deleteUser
}