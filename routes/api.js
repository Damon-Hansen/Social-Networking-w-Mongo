const { getAllUsers, createUser, getUserById, updateUser, deleteUser, updateFriend, deleteFriend } = require('../controllers/user-controller');
const { getAllThoughts, createThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction } = require('../controllers/thought-controller');
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

router.route('/thoughts')
.get(getAllThoughts)
.post(createThought)

router.route('/thoughts/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router.route('/thoughts/:id/reactions')
.post(createReaction)

router.route('/thoughts/:id/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;