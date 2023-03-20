const express = require('express')
const router = express.Router()
const { registerUser,loginUser,getMe, getUser, updateUser, deleteUser } = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login',loginUser)
router.get('/me', protect,getMe)
router.get('/',getUser)
router.route('/:id').put(updateUser).delete(deleteUser)


module.exports = router