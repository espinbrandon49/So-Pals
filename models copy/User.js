const mongoose = require('mongoose');

// ***** USER SCHEMA ***** //
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
    validate: [validateEmail, "Please fill a valid email address"],
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

// ***** THOUGHT SCHEMA ***** //
const thoughtSchema = new mongoose.Schema({
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
  reactions: [reactionSchema]
});

// ***** REACTION SCHEMA ***** //
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: schema.ObjectId,
    default: schema.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
});

//GETTER FOR DATE
function formatDate (createdAt) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}

//VIRTUAL
userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;