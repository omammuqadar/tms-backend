const express = require('express')
const router = express.Router()
const { getSession, setSession, updateSession, deleteSession } = require('../controller/sessionController')

router.route('/').get(getSession).post(setSession)
router.route('/:id').put(updateSession).delete(deleteSession)


module.exports = router