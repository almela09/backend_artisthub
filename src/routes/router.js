import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import publicationRoutes from "./publication.routes.js";
import commentRoutes from "./comment.routes.js";

const router = Router();
router.use ('/auth',authRoutes);
router.use('/user', userRoutes);
router.use('/publication', publicationRoutes);
router.use('/comment', commentRoutes);
export default router;