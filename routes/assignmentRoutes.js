const express = require('express')
const router = express.Router()
const { getAssignment, setAssignment, updateAssignment, deleteAssignment } = require('../controller/assignmentController')

router.route('/').get(getAssignment).post(setAssignment)
router.route('/:id').put(updateAssignment).delete(deleteAssignment)

module.exports = router