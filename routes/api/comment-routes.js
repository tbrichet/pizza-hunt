const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// POST - Add Comment (/api/comments/<pizzaId>)
router
    .route('/:pizzaId')
    .post(addComment);

// EDIT AND DELETE COMMENTS (/api/comments/<pizzaId>/<commentId>)
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// DELETE REPLIES
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);

module.exports = router;