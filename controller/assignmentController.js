const asyncHandler = require('express-async-handler')

const Assignment = require('../models/assignmentModel')

// @desc    Get assignment
// @route   GET /backend/assignment
// @access  Private
const getAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.find({program_id: req.body.program_id}) 

  res.status(200).json(assignment)
})

// @desc    Set assignment
// @route   POST /backend/assignment
// @access  Private
const setAssignment = asyncHandler(async (req, res) => {

  const { session_id, participant_id, assignment_file, submission_date, marks } = req.body

  if(!session_id || !participant_id || !assignment_file || !submission_date) {
    res.status(400)
    throw new Error("Please Add Required Fields.")
  }

  const assignment = await Assignment.create({
    session_id: session_id,
    participant_id: participant_id,
    assignment_file: assignment_file,
    submission_date: submission_date,
    marks: marks,
  })

  res.status(200).json(assignment)
})

// @desc    Update assignment
// @route   PUT /backend/assignment/:id
// @access  Private
const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id)

  if(!assignment) {
    res.status(400)
    throw new Error("Assignment Not Found")
  }

  const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedAssignment)
})

// @desc    Delete assignment
// @route   DELETE /backend/assignment/:id
// @access  Private
const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id)

  if(!assignment) {
    res.status(400)
    throw new Error("Assignment Not Found")
  }

  await assignment.deleteOne()

  res.status(200).json({id: req.params.id})
})


module.exports = {
  getAssignment,
  setAssignment,
  updateAssignment,
  deleteAssignment
}