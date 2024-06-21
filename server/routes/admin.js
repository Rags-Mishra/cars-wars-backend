import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/register', upload.none(), registerAdmin);
router.post('/login', upload.none(), loginAdmin);

export default router;
