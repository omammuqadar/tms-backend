const asyncHandler = require('express-async-handler')

const Feedback = require('../models/feedbackModel')

// @desc    Get feedback
// @route   GET /backend/feedback
// @access  Private
const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find({program_id: req.body.program_id}) 

  res.status(200).json(feedback)
})

// @desc    Set feedback
// @route   POST /backend/feedback
// @access  Private
const setFeedback = asyncHandler(async (req, res) => {

  const { session_id, participant_id, feedback_message, feedback_date } = req.body

  if(!session_id || !participant_id || !feedback_message || !feedback_date) {
    res.status(400)
    throw new Error("Please Add Required Fields.")
  }

  const feedback = await Feedback.create({
    session_id: session_id,
    participant_id: participant_id,
    feedback_message: feedback_message,
    feedback_date: feedback_date,
  })

  res.status(200).json(feedback)
})

// @desc    Update feedback
// @route   PUT /backend/feedback/:id
// @access  Private
const updateFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id)

  if(!feedback) {
    res.status(400)
    throw new Error("Feedback Not Found")
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedFeedback)
})

// @desc    Delete feedback
// @route   DELETE /backend/feedback/:id
// @access  Private
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id)

  if(!feedback) {
    res.status(400)
    throw new Error("Feedback Not Found")
  }

  await feedback.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getFeedback,
  setFeedback,
  updateFeedback,
  deleteFeedback
}