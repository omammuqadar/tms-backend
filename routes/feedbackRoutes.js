const express = require('express')
const router = express.Router()
const { getFeedback, setFeedback, updateFeedback, deleteFeedback } = require('../controller/feedbackController')

router.route('/').get(getFeedback).post(setFeedback)
router.route('/:id').put(updateFeedback).delete(deleteFeedback)

module.exports = router