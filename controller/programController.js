const asyncHandler = require('express-async-handler')

const Program = require('../models/programModel')

// @desc    Get program
// @route   GET /backend/program
// @access  Private
const getProgram = asyncHandler(async (req, res) => {
  const program = await Program.find() 

  res.status(200).json(program)
})

// @desc    Set program
// @route   POST /backend/program
// @access  Private
const setProgram = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400)
    throw new Error("Please add Program name")
  }

  const program = await Program.create({
    name: req.body.name,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  })

  res.status(200).json(program)
})

// @desc    Update program
// @route   PUT /backend/program/:id
// @access  Private
const updateProgram = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id)

  if(!program) {
    res.status(400)
    throw new Error("Program Not Found")
  }

  const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedProgram)
})

// @desc    Delete program
// @route   DELETE /backend/program/:id
// @access  Private
const deleteProgram = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id)

  if(!program) {
    res.status(400)
    throw new Error("Program Not Found")
  }

  await program.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getProgram,
  setProgram,
  updateProgram,
  deleteProgram
}