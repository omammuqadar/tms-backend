const asyncHandler = require('express-async-handler')

const Session = require('../models/sessionModel')

// @desc    Get Session
// @route   GET /backend/session
// @access  Private
const getSession = asyncHandler(async (req, res) => {
  const session = await Session.find({program_id: req.body.program_id}) 

  res.status(200).json(session)
})

// @desc    Set session
// @route   POST /backend/session
// @access  Private
const setSession = asyncHandler(async (req, res) => {

  const { program_id, center, start_date, end_date, trainer_id, monitor_id, participant_ids } = req.body

  if(!program_id || !center || !start_date || !end_date) {
    res.status(400)
    throw new Error("Please Add Required Fields.")
  }

  const session = await Session.create({
    program_id: program_id,
    center: center,
    start_date: start_date,
    end_date: end_date,
    trainer_id: trainer_id,
    monitor_id: monitor_id,
    participant_ids: participant_ids,
  })

  res.status(200).json(session)
})

// @desc    Update session
// @route   PUT /backend/session/:id
// @access  Private
const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)

  if(!session) {
    res.status(400)
    throw new Error("Session Not Found")
  }

  const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedSession)
})

// @desc    Delete session
// @route   DELETE /backend/session/:id
// @access  Private
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)

  if(!session) {
    res.status(400)
    throw new Error("Session Not Found")
  }

  await session.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getSession,
  setSession,
  updateSession,
  deleteSession
}