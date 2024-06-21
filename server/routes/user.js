import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/register', upload.none(),registerUser);
router.post('/login', upload.none(),loginUser);

export default router;
