import { Router } from "express";
import { createComment, deleteComment, getComment, getComments, updateComment } from "../controllers/comment.controller.js";
const router= Router();

export default router; 