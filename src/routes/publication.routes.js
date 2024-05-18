import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from '../config/multerConfig.js';
import { createPublication, 
    updatePublication, 
    deletePublication, 
    putLikes, 
    removeLikes, 
    getAllPublications,  
    getAllPublicationsByUser, 
    getPublicationById
     } from "../controllers/publication.controller.js";
     
const router = Router();
router.post('/', auth, upload.single('image'), createPublication);
router.put('/:id', auth, upload.single('image'), updatePublication);
router.delete('/:id', auth, deletePublication);
router.put('/:id/likes', auth, putLikes);
router.delete('/:id/dislike', auth, removeLikes);
router.get('/publications', getAllPublications); 
router.get('/publications/:userId', getAllPublicationsByUser);
router.get('/:id', getPublicationById)

export default router; 