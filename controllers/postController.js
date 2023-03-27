const { User, Post } = require("../models");

module.exports = {
  // GET ALL POSTS
  getAllPosts(req, res) {
    Post.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },
  // GET ONE POST
  getOnePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .select("-__v")
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No comment found with that ID!" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  //CREATE POST
  createPost(req, res) {
    Post.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { posts: _id } },
          { new: true }
        );
      })
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  //UPDATE POST
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post found with that ID!" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE POST
  deletePost(req, res) {
    Post.findOneAndDelete({ _id: req.params.postId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post found with that ID!" })
          : User.findOneAndUpdate(
              { posts: req.params.postId },
              { $pull: { posts: req.params.postId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Post deleted, but no user found'})
          : res.json({ message: 'Post successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
  //CREATE COMMENT
  createComment(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { comments: req.body } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post found with that ID!" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE COMMENT
  deleteComment(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { comments: { commentId: req.params.commentId } } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: "No post found with that ID!" })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
};