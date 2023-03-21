const express = require('express')
const router = express.Router()
const { getUpdate, setUpdate, updateUpdate, deleteUpdate } = require('../controller/updateController')

router.route('/').get(getUpdate).post(setUpdate)
router.route('/:id').put(updateUpdate).delete(deleteUpdate)

module.exports = router