const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  // reactionId: {
  //   type: schema.ObjectId,
  //   default: schema.ObjectId
  // },
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

function formatDate (createdAt) {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
}
const Reaction = mongoose.model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);

module.exports = Reaction;
