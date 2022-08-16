const router = require('express').Router();
const Thought = require('../../models/Thought');

router.get('/all-thoughts', (req, res) => {
  // Using model in route to find all documents that are instances of that model
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
router.post('/new-thought', (req, res) => {
  const newThought = new Thought(req.body);
  newThought.save();
  if (newThought) {
    res.status(200).json(newThought);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds the first document with the name with the value equal to 'Kids' and updates that name to the provided URL param value
router.put('/update-thought/:id', (req, res) => {
  // Uses findOneAndUpdate() method on model
  Thought.findOneAndUpdate(
    // Finds first document with name of "Kids"
    { _id: req.params.id },
    // Replaces name with value in URL param
    { thoughtText: req.body.thoughtText ? req.body.thoughtText : Thought.thoughtText },
    // Sets to true so updated document is returned; Otherwise original document will be returned
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

// Finds first document that matches and deletes
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