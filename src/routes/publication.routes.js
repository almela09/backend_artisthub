import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";

const router= Router();
router.post('/', auth, createPublication);
router.put('/:id', auth, updatePublication);
router.delete('/:id', auth, deletePublication);

export default router; 