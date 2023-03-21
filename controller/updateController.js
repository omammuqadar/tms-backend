const asyncHandler = require('express-async-handler')

const Update = require('../models/updateModel')

// @desc    Get update
// @route   GET /backend/update
// @access  Private
const getUpdate = asyncHandler(async (req, res) => {
  const update = await Update.find({program_id: req.body.program_id}) 

  res.status(200).json(update)
})

// @desc    Set update
// @route   POST /backend/update
// @access  Private
const setUpdate = asyncHandler(async (req, res) => {

  const { session_id, update_message, update_date } = req.body

  if(!session_id || !update_message || !update_date) {
    res.status(400)
    throw new Error("Please Add Required Fields.")
  }

  const update = await Update.create({
    session_id: session_id,
    update_message: update_message,
    update_date: update_date,
  })

  res.status(200).json(update)
})

// @desc    Update update
// @route   PUT /backend/update/:id
// @access  Private
const updateUpdate = asyncHandler(async (req, res) => {
  const update = await Update.findById(req.params.id)

  if(!update) {
    res.status(400)
    throw new Error("Update Not Found")
  }

  const updatedUpdate = await Update.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedUpdate)
})

// @desc    Delete Update
// @route   DELETE /backend/Update/:id
// @access  Private
const deleteUpdate = asyncHandler(async (req, res) => {
  const update = await Update.findById(req.params.id)

  if(!update) {
    res.status(400)
    throw new Error("Update Not Found")
  }

  await update.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getUpdate,
  setUpdate,
  updateUpdate,
  deleteUpdate
}