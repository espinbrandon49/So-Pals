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

// /api/users
router.route('/all-users').get(getUsers)
router.route('/one-user/:id').get(getSingleUser)
router.route('/new-user').post(createUser)
router.route('/update-user/:id').put(updateUser)
router.route('/delete-user/:id').delete(deleteUser)
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;