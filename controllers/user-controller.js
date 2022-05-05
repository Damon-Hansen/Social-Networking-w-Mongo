const { User } = require('../models');

const userController = {
    //gets all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //gets A user by its Id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
        })
        .populate({
            path: 'thoughts'
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Create a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //Update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //Delete a user by its ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Add new friend to user friendslist

    updateFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$addToSet: {friends: params.friendId}}, { new: true, runValidators: true})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete friend from users friendslist
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$pull: {friends: params.friendId}}, { new: true, runValidators: true})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
}

module.exports = userController;