const { getAllUsers, createUser, getUserById, updateUser, deleteUser, updateFriend, deleteFriend } = require('../controllers/user-controller');

const router = require('express').Router();


router
.route('/users')
.get(getAllUsers)
.post(createUser)

router
.route('/users/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router
.route('/users/:id/friends/:friendId')
.post(updateFriend)
.delete(deleteFriend)

module.exports = router;