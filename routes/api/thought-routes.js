const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts);

// /api/thoughts/:userId
router
  .route('/:userId')
  .post(createThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:id/reactions')
  .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router 
  .route('/:id/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;