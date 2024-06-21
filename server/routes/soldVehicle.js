import express from 'express';
import { getAllSoldVehicles, addSoldVehicle } from '../controllers/soldVehicleController.js';

const router = express.Router();

router.get('/', getAllSoldVehicles);
router.post('/', addSoldVehicle);

export default router;
