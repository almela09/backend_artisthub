import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from '../config/multerConfig.js';
// import multer from 'multer';
import { createPublication, updatePublication,deletePublication, putLikes, removeLikes, getAllPublications, getPublicationById,getPublicationsByUser } from "../controllers/publication.controller.js";

// const upload = multer({ storage: multer.memoryStorage() });

const router= Router();
router.post('/', auth, upload.single('image'), createPublication);
router.put('/:id', auth, upload.single('image'), updatePublication);
router.delete('/:id', auth, deletePublication);
router.put('/:id/likes', putLikes);
router.delete('/:id/likes', removeLikes);
router.get('/publications', getAllPublications); //publication/publications
router.get('/publications/:id', getPublicationById); //publication/publications/:id
router.get('/publications/user/:userId', getPublicationsByUser);
export default router; 