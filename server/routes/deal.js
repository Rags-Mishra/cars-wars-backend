import express from 'express';
import { getAllDeals, addDeal } from '../controllers/dealController.js';

const router = express.Router();

router.get('/', getAllDeals);
router.post('/', addDeal);

export default router;
