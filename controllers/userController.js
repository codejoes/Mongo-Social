const { User, Post } = require('../models');

module.exports = {
    //GET ALL USERS
    getAllUsers(req, res) {
        User.find().then((user) => res.json(user)).catch((err) => res.status(500).json(err));
    },
    //GET ONE USER
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        //.populate('comments')
        //.populate('friends')
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({  message: 'No user found with that ID!' })
                : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },
    //CREATE USER
    createUser(req, res) {
        User.create(req.body).then((user) => res.json(user)).catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //UPDATE USER
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!' })
                : res.json(user)    
        )
        .catch((err) => res.status(500).json(err));
    },
    //DELETE USER AND POSTS
    deleteUser(req, res) {
        User.findOneAndDelete( { _id: req.params.userId } )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!' })
                : Post.deleteMany({ _id: req.params.userId })
        ).then(() => res.json({ message: 'User and comments deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    //ADD FRIEND
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //DELETE FRIEND
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};