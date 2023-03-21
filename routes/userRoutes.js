const express = require('express')
const router = express.Router()
const { setUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', setUser)
router.get('/',getUsers)
router.get('/:id',getUser)
router.route('/:id').put(updateUser).delete(deleteUser)


module.exports = router