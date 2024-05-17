import { Router } from "express";
import { createComment, deleteComment, getComment, getComments, updateComment, getCommentsByPublicationId } from "../controllers/comment.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router= Router();
router.post('/', auth, createComment);
router.get('/',auth, getComments);
// router.get('/:id/comments', getCommentsByPublicationId);
router.get('/:publicationId', getCommentsByPublicationId);
router.get('/:id', getComment);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);
export default router; 