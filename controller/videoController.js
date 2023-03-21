const asyncHandler = require('express-async-handler')

const Video = require('../models/videoModel')

// @desc    Get video
// @route   GET /backend/video
// @access  Private
const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.find({program_id: req.body.program_id}) 

  res.status(200).json(video)
})

// @desc    Set video
// @route   POST /backend/video
// @access  Private
const setVideo = asyncHandler(async (req, res) => {

  const { session_id, video_file, video_date} = req.body

  if(!session_id || !video_file || !video_date ) {
    res.status(400)
    throw new Error("Please Add Required Fields.")
  }

  const video = await Video.create({
    session_id: session_id,
    video_file: video_file,
    video_date: video_date,
  })

  res.status(200).json(video)
})

// @desc    Update video
// @route   PUT /backend/video/:id
// @access  Private
const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)

  if(!video) {
    res.status(400)
    throw new Error("Video Not Found")
  }

  const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  })

  res.status(200).json(updatedVideo)
})

// @desc    Delete video
// @route   DELETE /backend/video/:id
// @access  Private
const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id)

  if(!video) {
    res.status(400)
    throw new Error("Video Not Found")
  }

  await video.deleteOne()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getVideo,
  setVideo,
  updateVideo,
  deleteVideo
}