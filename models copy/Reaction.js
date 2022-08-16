const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    minLength: 1,
    maxlength: 280,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  },
  username: {
    type: String,
    required: true,
  },
  reactions: {}
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;
