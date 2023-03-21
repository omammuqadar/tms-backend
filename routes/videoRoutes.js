const express = require('express')
const router = express.Router()
const { getVideo, setVideo, updateVideo, deleteVideo } = require('../controller/videoController')

router.route('/').get(getVideo).post(setVideo)
router.route('/:id').put(updateVideo).delete(deleteVideo)

module.exports = router