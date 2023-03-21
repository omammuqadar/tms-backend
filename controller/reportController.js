const asyncHandler = require('express-async-handler')

const Reports = require('../models/reportModel')

// @desc    Get reports
// @route   GET /backend/reports
// @access  Private
const getReports = asyncHandler(async (req, res) => {
  const reports = await Reports.find({program_id: req.body.program_id}) 

  res.status(200).json(reports)
})

// @desc    Set reports
// @route   POST /backend/reports
// @access  Private
const setReports = asyncHandler(async (req, res) => {

  const { session_id, report_file, report_date } = req.body

  if(!session_id || !report_file || !report_date ) {
    res.status(400)
    throw new Error("Please Add Required Fields.")
  }

  const reports = await Reports.create({
    session_id: session_id,
    report_file: report_file,
    report_date: report_date,
  })

  res.status(200).json(reports)
})

// @desc    Update Reports
// @route   PUT /backend/Reports/:id
// @access  Private
const updateReports = asyncHandler(async (req, res) => {
  const reports = await Reports.findById(req.params.id)

  if(!reports) {
    res.status(400)
    throw new Error("Reports Not Found")
  }

  const updatedReports = await Reports.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedReports)
})

// @desc    Delete Reports
// @route   DELETE /backend/Reports/:id
// @access  Private
const deleteReports = asyncHandler(async (req, res) => {
  const reports = await Reports.findById(req.params.id)

  if(!reports) {
    res.status(400)
    throw new Error("Reports Not Found")
  }

  await reports.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getReports,
  setReports,
  updateReports,
  deleteReports
}