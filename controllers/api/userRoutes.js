const router = require('express').Router();
const User = require('../../models/User');
const connection = require('../../config/connection')

router.get('/all-users', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

module.exports = router;