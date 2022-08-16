const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true, 
    trim: true, 
    unique: true
  },
  email:{
    type: String, 
    unique: true,
    required: true, 
    validate: [validateEmail, "Please fill a valid email address"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts:[{
    thoughtsText: {
      type: mongoose.Schema.Types.String,
      ref: "Thoughts"
    }
  }],
  friends:{"$ref": "friends", "$id": "_id", "$db": "users" }
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;