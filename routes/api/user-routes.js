const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendsId
router 
  .route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;
