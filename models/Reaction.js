const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
});

function formatDate(createdAt) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}

const handleError = (err) => console.error(err);

module.exports = reactionSchema;
