const mongoose = require('mongoose');
const reactionSchema = require('./Reaction')

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
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false, 
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

function formatDate(createdAt) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}

module.exports = Thought;

