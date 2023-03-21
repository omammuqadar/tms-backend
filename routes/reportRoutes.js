const express = require('express')
const router = express.Router()
const { getReports, setReports, updateReports, deleteReports } = require('../controller/reportController')

router.route('/').get(getReports).post(setReports)
router.route('/:id').put(updateReports).delete(deleteReports)

module.exports = router