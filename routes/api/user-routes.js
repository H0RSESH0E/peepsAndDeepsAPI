const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require ('../../controllers/user-controller');

// /api/users
router.route('/')
.get(getAllUser)
.post(createNewUser);

// /api/users/:userId
router.route('/:userId')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;