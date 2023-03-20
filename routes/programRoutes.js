const express = require('express')
const router = express.Router()
const { getProgram, setProgram, updateProgram, deleteProgram } = require('../controller/programController')

router.route('/').get(getProgram).post(setProgram)
router.route('/:id').put(updateProgram).delete(deleteProgram)


module.exports = router