import express from 'express';
import userRoutes from './user.js';
import adminRoutes from './admin.js';
import dealershipRoutes from './dealership.js';
import carRoutes from './car.js';
import dealRoutes from './deal.js';
import soldVehicleRoutes from './soldVehicle.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/dealerships', dealershipRoutes);
router.use('/cars', carRoutes);
router.use('/deals', dealRoutes);
router.use('/soldVehicles', soldVehicleRoutes);

export default router;
