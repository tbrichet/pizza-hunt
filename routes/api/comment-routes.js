const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// POST - Add Comment (/api/comments/<pizzaId>)
router.route('/:pizzaId').post(addComment);

// DELETE - Delete Comment (/api/comments/<pizzaId>/<commentId>)
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;