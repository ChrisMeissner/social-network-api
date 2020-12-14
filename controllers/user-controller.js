const { User, Thought } = require('../models');

const userController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(({ thoughts }) => {
        return Thought.deleteOne(
          { _id: {$in: thoughts} }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with that id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // create friend 
  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: { _id: params.friendsId } } },
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!'});
      }
      return User.findOneAndUpdate(
        { _id: params.friendsId},
        { $push: {friends: params.id}},
        {new: true, runValidators: true }
      )
      .then(dbFriendData => {
        if (!dbFriendData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbFriendData);
      });
    })
    .catch(err => res.json(err));
  },

  // delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: { _id: params.friendsId } } },
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      return User.findOneAndUpdate(
        { _id: params.friendsId },
        { $pull: { friends: { _id: params.id } } },
        { new: true, runValidators: true }
      )
      .then(dbFriendData => {
        if (!dbFriendData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbFriendData);
      });
    })
    .catch(err => res.json(err));
  } 
};

module.exports = userController;
