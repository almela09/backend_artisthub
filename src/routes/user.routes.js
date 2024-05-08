import { Router } from "express";
import {isSuperAdmin} from "../middleware/isSuperAdmin.js"
import { auth } from "../middleware/auth.middleware.js";
import { getAllUser, getUserProfile, updateUserProfile, uploadUserProfileImage} from "../controllers/user.controller.js";
// import upload from '../config/multerConfig.js';


const router= Router();

router.get('/', auth, isSuperAdmin, getAllUser); 
router.get('/profile', auth, getUserProfile); 
// router.post('/image', upload.single('avatar'), uploadUserProfileImage);
router.post('/image', uploadUserProfileImage);
router.put('/users', auth, updateUserProfile);

export default router; 
