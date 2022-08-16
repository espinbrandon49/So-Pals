const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.get('/all-thoughts', (req, res) => {
  Thought.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

router.get('/one-thought/:id', (req, res) => {
  Thought.findOne({ _id: req.params.id }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

///does not connect to user
router.post('/new-thought', async (req, res) => {
  const newThought = await new Thought(req.body);
  newThought.save();
  if (newThought) {
    let updateUser = await User.findOneAndUpdate(
      {_id: req.body.userId},
      {$push: {thoughts: newThought._id}},
      {new: true}
    )
    res.status(200).json(updateUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

router.put('/update-thought/:id', (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    { thoughtText: req.body.thoughtText ? req.body.thoughtText : Thought.thoughtText },
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
});

router.delete('/delete-thought/:id', (req, res) => {
  Thought.findOneAndDelete({ name: req.params.id }, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

module.exports = router;