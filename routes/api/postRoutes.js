const router = require('express').Router();

const {
    getAllPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
    createComment,
    deleteComment
} = require('../../controllers/postController');

//GET ALL POSTS AND CREATE POST
router.route('/').get(getAllPosts).post(createPost);

//GET, UPDATE, DELETE A POST
router.route('/:postId')
.get(getOnePost)
.put(updatePost)
.delete(deletePost);

//CREATE COMMENT
router.route('/:postId/comments')
.post(createComment);

//DELETE COMMENT
router.route('/:postId/comments/:commentId')
.delete(deleteComment);

module.exports = router;