const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  postNewThought,
  updateThought,
  deleteThought,
  postNewReaction,
  deleteReaction,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/all-thoughts').get(getAllThoughts);
router.route('/one-thought/:id').get(getSingleThought);
router.route('/new-thought').post(postNewThought);
router.route('/update-thought/:id').put(updateThought);
router.route('/delete-thought/:id').delete(deleteThought);
router.route('/:thoughtId/reactions').post(postNewReaction).delete(deleteReaction);

module.exports = router;