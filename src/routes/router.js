import { Router } from "express";
import authRoutes from "./auth.routes.js";


const router = Router();
router.use ('/auth',authRoutes);
// router.use ('/publication', publicationRoutes);
// router.use('/user', userRoutes);
// router.use('/comment', commentRoutes);
export default router;