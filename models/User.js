const mongoose = require('mongoose');
const Thought= require('./Thought')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // validate: [validateEmail, "Please fill a valid email address"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [{
    thoughtsText: {
      type: mongoose.Schema.Types.String,
      ref: "Thoughts"
    }
  }],
  friends: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

// User.find({}).exec((err, collection) => {
//   if (collection.length === 0) {
//     User.insertMany(
//       [
//         { name: 'example1',
//           email: 'email1@example.com'
//         },
//         { name: 'example2',
//         email: 'email2@example.com' }
//       ],
//       (insertErr) => {
//         if (insertErr) {
//           handleError(insertErr);
//         }
//       }
//     );
//   }
// });

module.exports = User;