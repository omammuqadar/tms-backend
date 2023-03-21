const express = require('express')
const router = express.Router()
const { setUser, getUser, updateUser, deleteUser, getUserByEmail } = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', setUser)
router.get('/',getUser)
router.get('/login',getUserByEmail)
router.route('/:id').put(updateUser).delete(deleteUser)


module.exports = router