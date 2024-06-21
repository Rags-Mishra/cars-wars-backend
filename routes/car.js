import express from 'express';
import { addCar, getAllCars,getCarsByDealership } from '../controllers/carController.js';
const router=express.Router();

router.get('/',getAllCars);
router.get('/addCar',addCar);
router.get('/dealership/:dealershipId',getCarsByDealership);
export default router;