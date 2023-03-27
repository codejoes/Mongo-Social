const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

//USER ROUTES
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

//FRIEND ROUTES
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;