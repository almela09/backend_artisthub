import { Router } from "express";
import {isSuperAdmin} from "../middleware/isSuperAdmin.js"
import { auth } from "../middleware/auth.middleware.js";
import { getAllUser, getUserProfile, updateUserProfile, deleteUser} from "../controllers/user.controller.js";
// import upload from '../config/multerConfig.js';


const router= Router();

router.get('/', auth, isSuperAdmin, getAllUser);
router.delete('/:userId', auth, isSuperAdmin, deleteUser);
router.get('/profile', auth, getUserProfile); 
router.put('/users/:id', auth, updateUserProfile);
export default router; 
