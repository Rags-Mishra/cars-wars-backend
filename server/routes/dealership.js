import express from 'express';
import { registerDealership, loginDealership } from '../controllers/dealershipController.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/register', upload.none(),registerDealership);
router.post('/login', upload.none(),loginDealership);

export default router;
