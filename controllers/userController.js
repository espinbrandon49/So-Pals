const { Thought, User } = require('../models')

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },

  //get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },

  //create new user
  createUser(req, res) {
    const newUser = new User(req.body);
    newUser.save();
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  //update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username ? req.body.username : User.username,
        email: req.body.email ? req.body.email : User.email
      },
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },

  //delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },

  // add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true },
      (err, result) => {
        if (result) {
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    )
    res.status(200).json({ msg: 'friend added' });
  },

  // remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Deleted: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      });
  },
}

//////////////////////////////////////////////////////

// router.delete('/delete-user/:id', (req, res) => {
//   // User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
//   //   if (result) {
//   //     res.status(200).json(result);
//   //     console.log(`Deleted: ${result}`);
//   //   } else {
//   //     console.log('Uh Oh, something went wrong');
//   //     res.status(500).json({ message: 'something went wrong' });
//   //   }

//   // });
//   User.findOne({ _id: { $eq: req.params.id } }, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       console.log("Result : ", result);
//       console.log(User.username)
//       console.log(this.username)

//       Thought.deleteMany({ _id: { $eq: result.thoughts } }).then(function () {
//         console.log("Data deleted"); // Success
//       }).catch(function (error) {
//         console.log(error); // Failure
//       });
//     }
//   });
// }); https://www.codegrepper.com/code-examples/javascript/loop+through+mongoose.all%28%29

// router.delete('/delete-user/:id', (req, res) => {
//   User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
//     if (result) {
//       console.log(result.thoughts)
//       res.status(200).json(result);
//       console.log(`Deleted: ${result}`);
//     } else {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     }
//   });
// });

//////////////////////////////////////////////////////
