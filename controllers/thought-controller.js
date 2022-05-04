const { userInfo } = require('os');
const { Thought } = require('../models');
const User = require('../models/User');

const thoughtController = {
    //gets all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Gets a thought by its id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this Id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //creat a thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            return User.findOneAndUpdate({ _id: body.username }, {$push: {thoughts: _id}}, { new: true })
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },

    //update a thought by its id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData)
    })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete a thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this Id!'});
                return;
            }
            return User.findOneAndUpdate({ _id: dbThoughtData.username }, {$pull: {thoughts: dbThoughtData._id}}, { new: true })
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },

//add a reaction stored in a single thought
createReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, {$push: {reactions: body }}, { new: true })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

// delete a reaction stored in a thought
deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, {$pull: {reactions: body.reactionId}}, { new: true })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'});
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}
}

module.exports = thoughtController;