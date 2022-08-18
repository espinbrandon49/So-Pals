const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController')

// /api/users/
router.route('/').get(getUsers).post(createUser)

// /api/users/:id
router.route('/one-user/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

// /:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;